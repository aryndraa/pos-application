<?php

namespace App\Filament\Resources\Orders\RelationManagers;

use App\Models\AdditionalItem;
use App\Models\Menu;
use Filament\Actions\AssociateAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DissociateAction;
use Filament\Actions\DissociateBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('menu_id')
                    ->label('Menu')
                    ->relationship('menu', 'name')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->live()
                    ->afterStateUpdated(function ($state, Set $set) {
                        if ($state) {
                            $menu = Menu::find($state);
                            if ($menu) {
                                $set('unit_price', $menu->price);
                                $set('price', $menu->price);
                            }
                        }
                    }),

               TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->default(1)
                    ->minValue(1)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, Set $set, Get $get) {
                        $unitPrice = $get('unit_price') ?? 0;
                        $set('subtotal', $state * $unitPrice);
                    }),

               TextInput::make('unit_price')
                    ->required()
                    ->numeric()
                    ->prefix('IDR')
                    ->disabled()
                    ->dehydrated(),

               TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('IDR'),

               TextInput::make('subtotal')
                    ->numeric()
                    ->prefix('IDR')
                    ->disabled()
                    ->dehydrated()
                    ->default(0),

               Textarea::make('notes')
                    ->maxLength(500)
                    ->columnSpanFull(),

               Repeater::make('additionals')
                    ->label('Additional Items')
                    ->relationship('orderAdditionals')
                    ->schema([
                       Select::make('additional_item_id')
                            ->label('Additional Item')
                            ->options(AdditionalItem::pluck('name', 'id'))
                            ->searchable()
                            ->required()
                            ->live()
                            ->afterStateUpdated(function ($state, Set $set) {
                                if ($state) {
                                    $additional = AdditionalItem::find($state);
                                    if ($additional) {
                                        $set('unit_price', $additional->additional_price);
                                    }
                                }
                            }),

                       TextInput::make('quantity')
                            ->required()
                            ->numeric()
                            ->default(1)
                            ->minValue(1),

                       TextInput::make('unit_price')
                            ->required()
                            ->numeric()
                            ->prefix('IDR'),
                    ])
                    ->columns(3)
                    ->columnSpanFull()
                    ->defaultItems(0),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('menu.name')
            ->columns([
                 TextColumn::make('menu.name')
                    ->label('Menu')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('quantity')
                    ->alignCenter(),

                TextColumn::make('unit_price')
                    ->money('IDR'),

                TextColumn::make('price')
                    ->money('IDR'),

                TextColumn::make('subtotal')
                    ->money('IDR')
                    ->getStateUsing(function ($record) {
                        $itemTotal = $record->quantity * $record->unit_price;
                        $additionalTotal = $record->orderAdditionals->sum(function ($additional) {
                            return $additional->quantity * $additional->unit_price;
                        });
                        return $itemTotal + $additionalTotal;
                    }),

                TextColumn::make('orderAdditionals.additionalItem.name')
                    ->label('Additionals')
                    ->badge()
                    ->separator(','),

                TextColumn::make('notes')
                    ->limit(30)
                    ->toggleable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
            ])
            ->recordActions([
                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                ]),
            ]);
    }
}
