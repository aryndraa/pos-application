<?php

namespace App\Filament\Resources\Vouchers\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class VoucherForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                 Section::make('Voucher Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        TextInput::make('code')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(50)
                            ->alphaNum()
                            ->placeholder('e.g., DISCOUNT50')
                            ->helperText('Unique voucher code for customers to use'),

                        Select::make('type')
                            ->options([
                                'percentage' => 'Percentage',
                                'fixed' => 'Fixed Amount',
                            ])
                            ->required()
                            ->native(false)
                            ->live()
                            ->afterStateUpdated(function ($state, Set $set) {
                                if ($state === 'fixed') {
                                    $set('max_discount', null);
                                }
                            }),

                        TextInput::make('discount')
                            ->required()
                            ->numeric()
                            ->columnSpanFull()
                            ->minValue(0)
                            ->suffix(fn (Get $get) => $get('type') === 'percentage' ? '%' : 'IDR')
                            ->helperText(fn (Get $get) => $get('type') === 'percentage' 
                                ? 'Discount percentage (0-100)' 
                                : 'Fixed discount amount'),
                    ])
                    ->columns(2),

                Section::make('Discount Settings')
                    ->schema([
                        TextInput::make('max_discount')
                            ->numeric()
                            ->prefix('IDR')
                            ->minValue(0)
                            ->helperText('Maximum discount amount (only for percentage type)')
                            ->hidden(fn (Get $get) => $get('type') === 'fixed'),

                        TextInput::make('limit')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->helperText('Maximum number of times this voucher can be used'),
                    ])
                    ->columns(1),

                Section::make('Validity Period')
                    ->schema([
                        DateTimePicker::make('start_date')
                            ->required()
                            ->default(now())
                            ->native(false),

                        DateTimePicker::make('end_date')
                            ->required()
                            ->native(false)
                            ->after('start_date'),

                        Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Deactivate to temporarily disable this voucher'),
                    ])
                    ->columns(2),
            ]);
    }
}
