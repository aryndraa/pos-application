<?php

namespace App\Http\Controllers\Order;

use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemAdditional;
use Illuminate\Http\Request;
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

            

        return Inertia::render('orders', [
            'orders' => $orders
        ]);
    }

    public function store(OrderRequest $request) 
    {
    
        DB::beginTransaction();

        try {
            $totalPrice = collect($request->items)->sum('subtotal');

            $payAmount = $request->payment_method === 'cash' ? $request->pay : $totalPrice;

            $order = Order::create([
                'customer_name' => $request->customer_name,
                'code' => 'ORD-' . Str::upper(Str::random(8)),
                'order_date' => now(),
                'total_price' => $totalPrice,
                'pay' => $payAmount,
                'change' => $payAmount - $totalPrice,  
                'payment_method' => $request->payment_method,
                'status' => 'pending',
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

            DB::commit();

            broadcast(new OrderCreated($order))->toOthers();

            return redirect()->back()->with('success', 'Order created successfully');

        } catch (\Exception $e) {
            DB::rollBack();
            
            return redirect()->back()->with('error', 'Failed to create order: ' . $e->getMessage());
        }
    }

    public function histories (Request $request)
    {
        $search = $request->get('search');
        $orderBy = $request->get('orderBy');
        $direction = $request->get('direction');

        $orders = Order::with(['items.menu', 'items.orderAdditionals.additionalItem'])
        ->when($search, fn($q) =>
            $q->where('customer_name', 'like', '%' . $search . '%')
                ->orWhere('code', 'like', '%'. $search.'%')
        )
        ->when($orderBy, fn($q) =>  $q->orderBy($orderBy, $direction))
        ->paginate(10)
        ->withQueryString()
        ->through(function($order) {
            return [
                'id' => $order->id,
                'code' => $order->code,
                'customer_name' => $order->customer_name,
                'order_date' => $order->order_date,
                'total_price' => $order->total_price,
                'status' => $order->status,
                'payment_method' => $order->payment_method,
            ];
        })->toArray();

        return Inertia::render('history', [
            'orders'  => $orders,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
