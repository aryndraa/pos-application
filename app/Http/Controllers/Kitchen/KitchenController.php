<?php

namespace App\Http\Controllers\Kitchen;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KitchenController extends Controller
{
     public function index()
    {
         if (!Auth::user()->hasRole('kitchen')) {
            abort(403, 'Access denied');
        }

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
            

        return Inertia::render('kitchenDisplay', [
            'initialOrders' => $orders
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:processing,completed,cancelled'
        ]);

        $order->update([
            'status' => $request->status
        ]);

        return redirect()->back();
    }
}
