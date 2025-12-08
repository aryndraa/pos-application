<?php

namespace App\Filament\Resources\Additionals\Schemas;

use App\Models\File;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AdditionalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
             ->components([
                Section::make('Additional Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),

                        Select::make('type')
                            ->options([
                                'single' => 'Single Choice',
                                'multiple' => 'Multiple Choice',
                            ])
                            ->required()
                            ->native(false),

                        Toggle::make('is_required')
                            ->label('Required')
                            ->default(false),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),
            ]);
    }
}
