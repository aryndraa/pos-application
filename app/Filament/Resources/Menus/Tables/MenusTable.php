<?php

namespace App\Filament\Resources\Menus\Tables;

use App\Models\Menu;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class MenusTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image.file_path')
                    ->disk('public')
                    ->label('Image')
                    ->circular()
                    ->getStateUsing(function ($record) {
                        return $record->image?->file_path ?? null;
                    }),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('sku')
                    ->label('SKU')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('SKU copied!'),

                TextColumn::make('category.name')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info'),

                TextColumn::make('price')
                    ->money('idr')
                    ->sortable()
                    ->alignEnd(),

                IconColumn::make('is_available')
                    ->boolean()
                    ->sortable()
                    ->alignCenter()
                    ->label('Available'),

                TextColumn::make('additionals_count')
                    ->counts('additionals')
                    ->label('Add-ons')
                    ->alignCenter()
                    ->badge()
                    ->color('success'),
            ])
            ->defaultSort('name', 'asc')
            ->filters([
                SelectFilter::make('menu_category_id')
                    ->label('Category')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload(),

                TernaryFilter::make('is_available')
                    ->label('Availability')
                    ->placeholder('All menus')
                    ->trueLabel('Available only')
                    ->falseLabel('Unavailable only'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->after(function (Menu $record) {
                        if ($record->image) {
                            \Storage::disk('public')->delete($record->image->file_path);
                            $record->image->delete();
                        }
                    }),
                Action::make('toggle_availability')
                    ->label('Toggle Available')
                    ->icon('heroicon-o-arrow-path')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->action(function (Menu $record) {
                        $record->update(['is_available' => !$record->is_available]);
                    })
                    ->tooltip('Toggle availability'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                     DeleteBulkAction::make()
                        ->after(function ($records) {
                            foreach ($records as $record) {
                                if ($record->image) {
                                    \Storage::disk('public')->delete($record->image->file_path);
                                    $record->image->delete();
                                }
                            }
                        }),

                     BulkAction::make('set_available')
                        ->label('Set Available')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->update(['is_available' => true]))
                        ->deselectRecordsAfterCompletion(),

                    BulkAction::make('set_unavailable')
                        ->label('Set Unavailable')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->update(['is_available' => false]))
                        ->deselectRecordsAfterCompletion(),
                ]),
            ]);
    }
}
