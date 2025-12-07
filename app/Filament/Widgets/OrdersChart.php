<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Carbon;

class OrdersChart extends ChartWidget
{
    use InteractsWithPageFilters;

    protected ?string $heading = 'Orders Chart';

    protected int|string|array $columnSpan = 'full';
    protected ?string $maxHeight = '360px';
    protected static ?int $sort = 2;

    protected function getType(): string
    {
        return 'line';
    }

    protected function getData(): array
    {
        $range = $this->filters['time_range'] ?? 'today';

        $start = match ($range) {
            'today' => Carbon::today(),
            'week' => Carbon::now()->startOfWeek(),
            'month' => Carbon::now()->startOfMonth(),
            'year' => Carbon::now()->startOfYear(),
            default => Carbon::today(),
        };

        $end = Carbon::now();

        $orders = Order::whereBetween('order_date', [$start, $end])
            ->selectRaw('DATE(order_date) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Orders',
                    'data' => $orders->pluck('total'),
                ],
            ],
            'labels' => $orders->pluck('date'),
        ];
    }
}
