<?php

namespace App\Filament\Resources\Menus\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Group::make()
                    ->schema([

                    Section::make('Basic Information')
                        ->schema([
                            Select::make('menu_category_id')
                                ->label('Category')
                                ->relationship('category', 'name')
                                ->searchable()
                                ->preload()
                                ->required()
                                ->createOptionForm([
                                    TextInput::make('name')
                                        ->required()
                                        ->maxLength(255)
                                        ->live(onBlur: true)
                                        ->afterStateUpdated(fn (Set $set, ?string $state) => 
                                            $set('slug', Str::slug($state))
                                        ),
                                ]),

                            
                            TextInput::make('name')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn (Set $set) =>
                                    $set('sku', 'SKU-' . Str::upper(Str::random(6)))
                                ),

                            TextInput::make('sku')
                                ->label('SKU')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->readOnly()
                                ->maxLength(255)
                                ->helperText('Will be auto-generated from menu name'),

                            TextInput::make('price')
                                ->required()
                                ->numeric()
                                ->prefix('Rp')
                                ->minValue(0)
                                ->placeholder('0'),

                            Toggle::make('is_available')
                                ->label('Available for Sale')
                                ->default(true)
                                ->inline(false)
                                ->helperText('Toggle to enable/disable this menu'),
                        ])
                        ->columns(2),

                    
                    Section::make('Additional Options')
                        ->schema([
                            CheckboxList::make('additionals')
                                ->relationship('additionals', 'name')
                                ->searchable()
                                ->bulkToggleable()
                                ->columns(2)
                                ->helperText('Select additional options available for this menu')
                                ->columnSpanFull(),
                        ])
                        ->collapsible(),
                ]),


                Section::make('Recipe & Image')
                    ->schema([
                        RichEditor::make('recipe')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'bulletList',
                                'italic',
                                'orderedList',
                                'redo',
                                'undo',
                            ])
                            ->helperText('Describe how to prepare this menu'),

                        
                        FileUpload::make('image')
                            ->label('Menu Image')
                            ->disk('public')
                            ->directory('menus')
                            ->imageEditor()
                            ->maxSize(2048)
                            ->columnSpanFull()
                            ->helperText('Upload menu image (max 2MB)'),
                    ]),

            ]);
    }
}
