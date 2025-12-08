<?php

namespace App\Http\Controllers\Order;

use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemAdditional;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
           $orders = Order::with(['items.menu', 'items.orderAdditionals.additionalItem'])
            ->whereIn('status', ['pending', 'processing'])
            ->orderBy('order_date', 'asc')
            ->get()
            ->map(function($order) {
                return [
                    'id' => $order->id,
                    'code' => $order->code,
                    'customer_name' => $order->customer_name,
                    'order_date' => $order->order_date,
                    'total_price' => $order->total_price,
                    'status' => $order->status,
                    'items' => $order->items->map(function($item) {
                        return [
                            'id' => $item->id,
                            'menu' => [
                                'id' => $item->menu->id,
                                'name' => $item->menu->name,
                            ],
                            'quantity' => $item->quantity,
                            'unit_price' => $item->unit_price,
                            'subtotal' => $item->subtotal,
                            'notes' => $item->notes ?? '',
                            'additionals' => $item->orderAdditionals->map(function($add) {
                                return [
                                    'id' => $add->id,
                                    'quantity' => $add->quantity,
                                    'unit_price' => $add->unit_price,
                                    'additional_item' => [
                                        'id' => $add->additionalItem->id,
                                        'name' => $add->additionalItem->name,
                                    ],
                                ];
                            })->toArray(),
                        ];
                    })->toArray(),
                ];
            })->toArray();

            

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    public function store(OrderRequest $request) 
    {
        DB::beginTransaction();

        try {
            $subtotalPrice = collect($request->items)->sum(function ($item) {
                $itemSubtotal = $item['subtotal'];

                // Tambahkan harga additionals
                if (!empty($item['additionals'])) {
                    $additionalTotal = collect($item['additionals'])->sum(function ($add) {
                        return $add['quantity'] * $add['unit_price'];
                    });

                    $itemSubtotal += $additionalTotal;
                }

                return $itemSubtotal;
            });

            
            $cashierId = Auth::guard('cashier')->id();

            $totalDiscount = 0;
            $voucherId = null;

            if ($request->filled('voucher_code')) {
                $voucher = Voucher::where('code', $request->voucher_code)->first();

                if (!$voucher) {
                    throw new \Exception('Voucher code not found');
                }

                if (!$voucher->isValid()) {
                    $error = $voucher->getValidationError();
                    throw new \Exception($error ?? 'Invalid voucher');
                }

                $totalDiscount = $voucher->calculateDiscount($subtotalPrice);
                $voucherId = $voucher->id;

            }

            $totalPrice = $subtotalPrice - $totalDiscount;

            $payAmount = $request->payment_method === 'cash' ? $request->pay : $totalPrice;

            if ($request->payment_method === 'cash' && $payAmount < $totalPrice) {
                throw new \Exception('Payment amount is less than total price');
            }

           

            $order = Order::create([
                'customer_name' => $request->customer_name,
                'code' => 'ORD-' . Str::upper(Str::random(8)),
                'order_date' => now(),
                'subtotal_price' => $subtotalPrice,
                'voucher_id' => $voucherId ?? null,
                'total_discount' => $totalDiscount,
                'total_price' => $totalPrice,
                'service_type' => $request->service_type ?? 'dine in',
                'pay' => $payAmount,
                'change' => $payAmount - $totalPrice,  
                'payment_method' => $request->payment_method,
                'status' => 'pending',
                'cashier_id' => $cashierId
            ]);



            foreach ($request->items as $item) {
                $orderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $item['menu_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['subtotal'],
                    'notes' => $item['notes'] ?? '',
                ]);

                if (!empty($item['additionals'])) {
                    foreach ($item['additionals'] as $additional) {
                        OrderItemAdditional::create([
                            'order_item_id' => $orderItem->id,
                            'additional_item_id' => $additional['additional_item_id'],
                            'quantity' => $additional['quantity'],
                            'unit_price' => $additional['unit_price'],
                        ]);
                    }
                }
            }

             if ($request->filled('voucher_code')) {
                 $voucher->decrement('limit');
            }

            DB::commit();

            broadcast(new OrderCreated($order))->toOthers();

            return redirect()
                ->route('cashier.pos.bill', $order->id)
                ->with('success', 'Order created successfully');

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function show(Order $order) 
    {
        $order->load(['items.menu', 'items.orderAdditionals.additionalItem']);

        return Inertia::render('orders/show', [
            'id' => $order->id,
            'code' => $order->code,
            'customer_name' => $order->customer_name,
            'order_date' => $order->order_date,
            'pay' => $order->pay,
            'change' => $order->change,
            'payment_method' => $order->payment_method,
            'total_price' => $order->total_price,
            'status' => $order->status,
            'items' => $order->items->map(function($item) {
                return [
                    'id' => $item->id,
                    'menu' => [
                        'id' => $item->menu->id,
                        'name' => $item->menu->name,
                    ],
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'subtotal' => $item->subtotal,
                    'notes' => $item->notes ?? '',
                    'additionals' => $item->orderAdditionals->map(function($add) {
                        return [
                            'id' => $add->id,
                            'quantity' => $add->quantity,
                            'unit_price' => $add->unit_price,
                            'additional_item' => [
                                'id' => $add->additionalItem->id,
                                'name' => $add->additionalItem->name,
                            ],
                        ];
                    })->toArray(),
                ];
            })->toArray(),
        ]);
    }
}
