<?php

namespace App\Filament\Resources\Menus\Pages;

use App\Filament\Resources\Menus\MenuResource;
use App\Models\File;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EditMenu extends EditRecord
{
    protected static string $resource = MenuResource::class;

    protected $imagePath;

    protected ?string $uploadedImage = null;

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Menu updated successfully!';
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->after(function () {
                    if ($this->record->image) {
                        Storage::disk('public')->delete($this->record->image->file_path);
                        $this->record->image->delete();
                    }
                }),
        ];
    }
     protected function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['image']) && $data['image']) {

            if ($this->record->image) {
                Storage::disk('public')->delete($this->record->image->file_path);
                $this->record->image->delete();
            }

            $uploaded = $this->record->image()->create([
                'file_name' => basename($data['image']),
                'file_path' => $data['image'], 
                 'file_type' => Storage::disk('public')->mimeType($data['image']),
            ]);

            $data['image_id'] = $uploaded->id;
        }

        unset($data['image']); 

        return $data;
    }
}
