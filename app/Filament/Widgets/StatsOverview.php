<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Carbon\Carbon;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{

    use InteractsWithPageFilters;

    protected array|int|null $columns = 4;

    protected function getStats(): array
    {
        $filter = $this->filters['time_range'] ?? 'today';

        $startDate = match ($filter) {
            'week' => Carbon::now()->startOfWeek(),
            'month' => Carbon::now()->startOfMonth(),
            'year' => Carbon::now()->startOfYear(),
            default => Carbon::today(),
        };

        $endDate = match ($filter) {
            'week' => Carbon::now()->endOfWeek(),
            'month' => Carbon::now()->endOfMonth(),
            'year' => Carbon::now()->endOfYear(),
            default => Carbon::today(),
        };
        
        $totalEarnings = Order::query()
            ->where('status', 'completed')
            ->whereBetween('order_date', [$startDate, $endDate])
            ->sum('total_price');

        $totalOrders = Order::query()
            ->where('status', 'completed')
            ->whereBetween('order_date', [$startDate, $endDate])
            ->count();

        return [
            Stat::make(
                'Total Earnings',
                'Rp ' . number_format($totalEarnings, 0, ',', '.')
            )->color('primary')
            ->columnSpan(2),

            Stat::make(
                'Total Completed Orders', $totalOrders. ' Orders'
            )->color('primary')
            ->columnSpan(2),
        ];
    }
}
