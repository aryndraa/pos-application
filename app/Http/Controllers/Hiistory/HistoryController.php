<?php

namespace App\Http\Controllers\Hiistory;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index(Request $request)
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

        return Inertia::render('histories/index', [
            'orders'  => $orders,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
