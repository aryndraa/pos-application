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
        $totalEarnings = Order::query()->where('status', 'completed')->sum('total_price');
        $orderInQueue = Order::query()->whereIn('status', ['pending', 'processing', 'ready'])->count();
        $waitingPayments = Order::query()->where('status', 'awaiting payment')->count();

        $popularMenu = Menu::query()
            ->withSum('orders as total_sold', 'quantity')
            ->orderByDesc('total_sold')
            ->take(5)
            ->get(['id', 'name']);

        $lowStockMenu = Menu::query()
            ->where('stock', '<=', 5)
            ->get(['id', 'name', 'stock']);

        return Inertia::render('home', [
            'totalEarnings' => $totalEarnings,
            'orderInQueue' => $orderInQueue,
            'waitingPayments' => $waitingPayments,
            'popularMenu' => $popularMenu,
        ]);
    }
}
