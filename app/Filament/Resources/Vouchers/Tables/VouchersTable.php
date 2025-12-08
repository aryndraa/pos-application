<?php

namespace App\Filament\Resources\Vouchers\Tables;

use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class VouchersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                 TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('code')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->badge()
                    ->color('info'),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'percentage' => 'success',
                        'fixed' => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),

                TextColumn::make('discount')
                    ->getStateUsing(function ($record) {
                        if ($record->type === 'percentage') {
                            return $record->discount . '%';
                        }
                        return 'Rp ' . number_format($record->discount, 0, ',', '.');
                    })
                    ->sortable(),

                TextColumn::make('max_discount')
                    ->money('IDR')
                    ->placeholder('-')
                    ->toggleable(),

                TextColumn::make('usage')
                    ->label('Usage')
                    ->getStateUsing(function ($record) {
                        $used = $record->orders()->count();
                        $limit = $record->limit == 0 ? '∞' : $record->limit;
                        return $used . ' / ' . $limit;
                    })
                    ->badge()
                    ->color(function ($record) {
                        if ($record->limit == 0) return 'success';
                        $used = $record->orders()->count();
                        $percentage = ($used / $record->limit) * 100;
                        if ($percentage >= 100) return 'danger';
                        if ($percentage >= 75) return 'warning';
                        return 'success';
                    }),

                TextColumn::make('start_date')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('end_date')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),

                IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active')
                    ->sortable(),

                TextColumn::make('status')
                    ->badge()
                    ->getStateUsing(function ($record) {
                        if (!$record->is_active) return 'Inactive';
                        
                        $now = now();
                        if ($now->lt($record->start_date)) return 'Scheduled';
                        if ($now->gt($record->end_date)) return 'Expired';
                        
                        if ($record->limit > 0) {
                            $used = $record->orders()->count();
                            if ($used >= $record->limit) return 'Used Up';
                        }
                        
                        return 'Active';
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'Active' => 'success',
                        'Scheduled' => 'info',
                        'Expired' => 'danger',
                        'Used Up' => 'warning',
                        'Inactive' => 'gray',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

            ])
            ->filters([
               SelectFilter::make('type')
                    ->options([
                        'percentage' => 'Percentage',
                        'fixed' => 'Fixed Amount',
                    ]),

               TernaryFilter::make('is_active')
                    ->label('Active Status')
                    ->placeholder('All vouchers')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),

               Filter::make('active_now')
                    ->label('Currently Valid')
                    ->query(fn ( $query) => 
                        $query->where('is_active', true)
                            ->where('start_date', '<=', now())
                            ->where('end_date', '>=', now())
                    )
                    ->toggle(),

                Filter::make('expired')
                    ->label('Expired')
                    ->query(fn ($query)  => 
                        $query->where('end_date', '<', now())
                    )
                    ->toggle(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),

                    BulkAction::make('activate')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(fn ($records) => $records->each->update(['is_active' => true]))
                        ->deselectRecordsAfterCompletion(),
                    
                    BulkAction::make('deactivate')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->action(fn ($records) => $records->each->update(['is_active' => false]))
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');;
    }
}
