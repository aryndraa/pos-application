<?php

namespace App\Filament\Resources\Additionals\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class AdditionalsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

               TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'single' => 'info',
                        'multiple' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state) . ' Choice'),

               IconColumn::make('is_required')
                    ->boolean()
                    ->label('Required')
                    ->alignCenter(),

               TextColumn::make('items_count')
                    ->counts('items')
                    ->label('Items')
                    ->alignCenter()
                    ->badge()
                    ->color('warning'),

               TextColumn::make('menus_count')
                    ->counts('menus')
                    ->label('Used in Menus')
                    ->alignCenter()
                    ->badge()
                    ->color('success'),
            ])
            ->filters([
                  SelectFilter::make('type')
                    ->options([
                        'single' => 'Single Choice',
                        'multiple' => 'Multiple Choice',
                    ]),

                TernaryFilter::make('is_required')
                    ->label('Required')
                    ->placeholder('All')
                    ->trueLabel('Required only')
                    ->falseLabel('Optional only'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
