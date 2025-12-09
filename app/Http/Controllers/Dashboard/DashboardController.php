<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $username = Auth::guard('cashier')->user()->name;

        $inProgressOrders = Order::query()
            ->whereIn('status', ['pending', 'processing'])
            ->select(['id', 'customer_name', 'status', 'order_date'])
            ->withCount('items')
            ->orderBy('order_date', 'desc')
            ->get();

        $totalTodayOrders = Order::query()
            ->whereDate('order_date', now())
            ->select(['id', 'customer_name', 'status', 'order_date'])
            ->withCount('items')
            ->orderBy('order_date', 'desc')
            ->get();

        $totalEarnings = Order::query()->where('status', 'completed')->sum('total_price');
        $orderInQueue =  $inProgressOrders->count();
        $totalTodayOrdersCount =  $totalTodayOrders->count();

        $productSales = Menu::query()
            ->whereHas('orders', function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->whereDate('created_at', '>=', now());
                });
            })
            ->withSum('orders as total_sold', 'quantity')
            ->orderByDesc('total_sold')
            ->with(['image'])
            ->take(5)
            ->get(['id', 'name'])
            ->map(function ($menu) {
                return [
                    'id'         => $menu->id,
                    'name'       => $menu->name,
                    'total_sold' => $menu->total_sold ?? 0,
                    'file_url'  => $menu->image->file_url ?? null, 
                ];
            });


        $unavailableMenu = Menu::query()
            ->where('is_available', false)
            ->take(5)
            ->with(['image'])   
            ->get(['id', 'name'])
            ->map(function ($menu) {
                return [
                    'id'         => $menu->id,
                    'name'       => $menu->name,
                    'total_sold' => $menu->total_sold ?? 0,
                    'file_url'  => $menu->image->file_url ?? null, 
                ];
            });;

        $weeklyOrders = Order::query()
            ->selectRaw('DATE(order_date) as date, COUNT(*) as total')
            ->where('order_date', '>=', now()->subDays(6)) 
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('home', [
            'username' => $username,
            'totalEarnings' => $totalEarnings,
            'orderInQueue' => $orderInQueue,
            'totalTodayOrdersCount' => $totalTodayOrdersCount,
            'productSales' => $productSales,
            'unavailableMenu' => $unavailableMenu,
            'inProgressOrders' => $inProgressOrders,
            'totalTodayOrders' => $totalTodayOrders,
            'weeklyOrders' => $weeklyOrders
        ]);
    }
}
