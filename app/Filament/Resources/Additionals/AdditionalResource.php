<?php

namespace App\Filament\Resources\Additionals;

use App\Filament\Resources\Additionals\Pages\CreateAdditional;
use App\Filament\Resources\Additionals\Pages\EditAdditional;
use App\Filament\Resources\Additionals\Pages\ListAdditionals;
use App\Filament\Resources\Additionals\Schemas\AdditionalForm;
use App\Filament\Resources\Additionals\Tables\AdditionalsTable;
use App\Models\Additional;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AdditionalResource extends Resource
{
    protected static ?string $model = Additional::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return AdditionalForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AdditionalsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAdditionals::route('/'),
            'create' => CreateAdditional::route('/create'),
            'edit' => EditAdditional::route('/{record}/edit'),
        ];
    }
}
