<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
              Section::make('Order Information')
                    ->schema([
                       TextInput::make('customer_name')
                            ->required()
                            ->maxLength(255),

                       TextInput::make('code')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->default(fn () => 'ORD-' . strtoupper(uniqid()))
                            ->disabled()
                            ->dehydrated()
                            ->maxLength(255),

                       DateTimePicker::make('order_date')
                            ->required()
                            ->default(now()),

                       Select::make('payment_method')
                            ->options([
                                'cash' => 'Cash',
                                'card' => 'Card',
                                'e-wallet' => 'E-Wallet',
                                'transfer' => 'Bank Transfer',
                            ])
                            ->required()
                            ->native(false),

                       Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'processing' => 'Processing',
                                'completed' => 'Completed',
                                'cancelled' => 'Cancelled',
                            ])
                            ->required()
                            ->default('pending')
                            ->native(false),
                    ])
                    ->columns(2),

               Section::make('Payment Details')
                    ->schema([
                       TextInput::make('total_price')
                            ->required()
                            ->numeric()
                            ->prefix('IDR')
                            ->disabled()
                            ->dehydrated()
                            ->default(0),

                       TextInput::make('pay')
                            ->required()
                            ->numeric()
                            ->prefix('IDR')
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, Set $set, Get $get) {
                                $totalPrice = $get('total_price') ?? 0;
                                $change = $state - $totalPrice;
                                $set('change', max(0, $change));
                            }),

                       TextInput::make('change')
                            ->numeric()
                            ->prefix('IDR')
                            ->disabled()
                            ->dehydrated()
                            ->default(0),
                    ])
                    ->columns(1),
            ]);
    }
}
