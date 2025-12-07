<?php

namespace App\Filament\Resources\Additionals\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AdditionalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Toggle::make('is_required')
                    ->required(),
                Select::make('type')
                    ->options(['multiple' => 'Multiple', 'single' => 'Single'])
                    ->required(),
            ]);
    }
}
