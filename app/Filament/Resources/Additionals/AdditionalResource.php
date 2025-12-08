<?php

namespace App\Filament\Resources\Additionals;

use App\Filament\Resources\Additionals\Pages\CreateAdditional;
use App\Filament\Resources\Additionals\Pages\EditAdditional;
use App\Filament\Resources\Additionals\Pages\ListAdditionals;
use App\Filament\Resources\Additionals\RelationManagers\ItemsRelationManager;
use App\Filament\Resources\Additionals\Schemas\AdditionalForm;
use App\Filament\Resources\Additionals\Tables\AdditionalsTable;
use App\Models\Additional;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class AdditionalResource extends Resource
{
    protected static ?string $model = Additional::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPuzzlePiece;

    protected static ?string $label = 'Menu Additionals';

    protected static ?int $navigationSort = 2;

    protected static string|UnitEnum|null $navigationGroup = 'Menu';

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
            ItemsRelationManager::class
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
