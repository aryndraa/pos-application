<?php

namespace App\Filament\Resources\Additionals\RelationManagers;

use Filament\Actions\AssociateAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DissociateAction;
use Filament\Actions\DissociateBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image')
                    ->disk('public')
                    ->directory('menu-variants')
                    ->image(),

                Group::make()
                    ->schema([
                        TextInput::make('name')
                            ->required(),

                        TextInput::make('additional_price')
                            ->numeric()
                            ->minValue(0)
                            ->default(0),

                        Toggle::make('is_available')
                            ->default(true),
                    ])

            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                ImageColumn::make('image')
                    ->disk('public')
                    ->height(50)
                    ->getStateUsing(function ($record) {
                        return $record->image?->file_path ?? null;
                    }),

                TextColumn::make('name')
                    ->searchable(),

                TextColumn::make('additional_price')
                    ->money('IDR'),

                ToggleColumn::make('is_available'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('New Items')
                    ->mutateFormDataUsing(function (array $data): array {
                        if (isset($data['image']) && $data['image']) {
                            $this->tempImagePath = $data['image'];
                            unset($data['image']); 
                        }
                        return $data;
                    })
                    ->after(function ($record) {
                        if (isset($this->tempImagePath)) {
                            $record->image()->create([
                                'file_name' => basename($this->tempImagePath),
                                'file_path' => $this->tempImagePath,
                                'file_type' => Storage::disk('public')->mimeType($this->tempImagePath),
                            ]);
                            unset($this->tempImagePath);
                        }
                    }),
            ])
            ->recordActions([
                EditAction::make()
                    ->mutateFormDataUsing(function (array $data, $record): array {
                        return $this->handleImageUpload($data, $record);
                    }),

                DeleteAction::make()
                    ->before(function ($record) {
                        $this->deleteImage($record);
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->before(function ($records) {
                            foreach ($records as $record) {
                                $this->deleteImage($record);
                            }
                        }),
                ]),
            ]);
    }

    protected ?string $tempImagePath = null;

    protected function handleImageUpload(array $data, $record = null): array
    {
        if (isset($data['image']) && $data['image']) {
            if ($record && $record->image) {
                Storage::disk('public')->delete($record->image->file_path);
                $record->image->delete();
            }

            $imagePath = $data['image'];
            
            if ($record) {
                $record->image()->create([
                    'file_name' => basename($imagePath),
                    'file_path' => $imagePath,
                    'file_type' => Storage::disk('public')->mimeType($imagePath),
                ]);
            }
            
            unset($data['image']);
        }

        return $data;
    }

    protected function deleteImage($record): void
    {
        if ($record->image) {
            Storage::disk('public')->delete($record->image->file_path);
            $record->image->delete();
        }
    }
}