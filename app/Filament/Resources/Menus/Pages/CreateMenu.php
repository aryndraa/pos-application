<?php

namespace App\Filament\Resources\Menus\Pages;

use App\Filament\Resources\Menus\MenuResource;
use App\Models\File;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CreateMenu extends CreateRecord
{
    protected static string $resource = MenuResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Menu created successfully!';
    }

    
    protected function handleRecordCreation(array $data): Model
    {
        // Buat menu terlebih dulu (tanpa image)
        $menu = static::getModel()::create(collect($data)->except('image')->toArray());

        // Jika ada upload image
        if (!empty($data['image'])) {

            $menu->image()->create([
                'file_name' => basename($data['image']),
                'file_path' => $data['image'],
                'file_type' => Storage::disk('public')->mimeType($data['image']),
            ]);
        }

        return $menu;
    }

}
