<?php

namespace App\Filament\Resources\Additionals\Pages;

use App\Filament\Resources\Additionals\AdditionalResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAdditional extends EditRecord
{
    protected static string $resource = AdditionalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
