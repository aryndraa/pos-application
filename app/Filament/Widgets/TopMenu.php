<?php

namespace App\Filament\Widgets;

use App\Models\Menu;
use Carbon\Carbon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class TopMenu extends TableWidget
{
    use InteractsWithPageFilters;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Top 5 Best Selling Menu';

    public function table(Table $table): Table
    {
        return $table
            ->query(fn () => $this->getTopMenuQuery())
            ->columns([
                TextColumn::make('name')
                    ->label('Menu Name'),

                TextColumn::make('category.name')
                    ->label('Category')
                    ->badge(),

                TextColumn::make('price')
                    ->label('Price')
                    ->money('IDR'),

                TextColumn::make('total_sold')
                    ->label('Total Sold')
                    ->numeric()
                    ->default(0)    ,
            ])
            ->paginated(false)
            ->defaultSort('total_sold', 'desc');
    }

    protected function getTopMenuQuery(): Builder
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
            default => Carbon::today()->endOfDay(),
        };

        return Menu::query()
            ->with('category') 
            ->whereHas('orders', function ($query) use ($startDate, $endDate) {
                $query->whereHas('order', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('order_date', [$startDate, $endDate]);
                });
            })
            ->withSum(['orders as total_sold' => function ($query) use ($startDate, $endDate) {
                $query->whereHas('order', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate]);
                });
            }], 'quantity')
            ->orderByDesc('total_sold')
            ->limit(5);
    }
}