<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
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

        return Inertia::render('home');
    }
}
