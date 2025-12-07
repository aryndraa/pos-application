<?php

namespace App\Filament\Resources\Additionals\Pages;

use App\Filament\Resources\Additionals\AdditionalResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAdditionals extends ListRecords
{
    protected static string $resource = AdditionalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
