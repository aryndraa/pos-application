<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
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

        $productSales = Menu::query()
            ->whereHas('orders', function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->whereDate('created_at', '>=', now());
                });
            })
            ->withSum('orders as total_sold', 'quantity')
            ->orderByDesc('total_sold')
            ->take(5)
            ->get(['id', 'name']);

        $lowStockMenu = Menu::query()
            ->where('stock', '<=', 5)
            ->orderBy('stock', 'asc')
            ->take(5)
            ->get(['id', 'name', 'stock']);

        $weeklyOrders = Order::query()
            ->selectRaw('DATE(order_date) as date, COUNT(*) as total')
            ->where('order_date', '>=', now()->subDays(6)) 
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('home', [
            'totalEarnings' => $totalEarnings,
            'orderInQueue' => $orderInQueue,
            'waitingPayments' => $waitingPayments,
            'productSales' => $productSales,
            'lowStockMenu' => $lowStockMenu,
            'inProgressOrders' => $inProgressOrders,
            'waitingPaymentOrders' => $waitingPaymentOrders,
            'weeklyOrders' => $weeklyOrders
        ]);
    }
}
