<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $inProgressOrders = Order::query()
            ->whereIn('status', ['pending', 'processing', 'ready'])
            ->select(['id', 'customer_name', 'status', 'order_date'])
            ->withCount('items')
            ->orderBy('order_date', 'desc')
            ->get();

        $waitingPaymentOrders = Order::query()
            ->where('status', 'awaiting payment')
            ->select(['id', 'customer_name', 'status', 'order_date'])
            ->withCount('items')
            ->orderBy('order_date', 'desc')
            ->get();

        $totalEarnings = Order::query()->where('status', 'completed')->sum('total_price');
        $orderInQueue =  $inProgressOrders->count();
        $waitingPayments =  $waitingPaymentOrders->count();

        $popularMenu = Menu::query()
            ->withSum('orders as total_sold', 'quantity')
            ->orderByDesc('total_sold')
            ->take(5)
            ->get(['id', 'name']);

        $lowStockMenu = Menu::query()
            ->where('stock', '<=', 5)
            ->orderBy('stock', 'asc')
            ->take(5)
            ->get(['id', 'name', 'stock']);

        return Inertia::render('home', [
            'totalEarnings' => $totalEarnings,
            'orderInQueue' => $orderInQueue,
            'waitingPayments' => $waitingPayments,
            'popularMenu' => $popularMenu,
            'lowStockMenu' => $lowStockMenu,
            'inProgressOrders' => $inProgressOrders,
            'waitingPaymentOrders' => $waitingPaymentOrders
        ]);
    }
}
