<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\OrdersChart;
use App\Filament\Widgets\StatsOverview;
use BackedEnum;
use Filament\Forms\Components\Select;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Pages\Dashboard\Concerns\HasFiltersForm;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;

class Dashboard extends BaseDashboard
{
    use BaseDashboard\Concerns\HasFiltersForm;

    use InteractsWithPageFilters, HasFiltersForm;

    protected function getHeaderWidgets(): array
    {
        return [
        ];
    }

     public function getStats(): array
    {
        return [
            StatsOverview::class,
            OrdersChart::class
        ];
    }

    public function filtersForm(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Select::make('time_range')
                            ->options([
                                'today' => 'Today',
                                'week'  => 'This Week',
                                'month' => 'This Month',
                                'year'  => 'This Year',
                            ])
                            ->default('today')
                            ->placeholder('-')
                            ->label('Filter by Time Range'),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),
            ]);
    }
}