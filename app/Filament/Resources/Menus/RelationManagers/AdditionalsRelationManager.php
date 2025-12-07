<?php

namespace App\Filament\Resources\Menus\RelationManagers;

use Filament\Actions\AttachAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DetachAction;
use Filament\Actions\DetachBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class AdditionalsRelationManager extends RelationManager
{
    protected static string $relationship = 'additionals';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Select::make('type')
                            ->options([
                                'single' => 'Single Choice',
                                'multiple' => 'Multiple Choice',
                            ])
                            ->required()
                            ->native(false)
                            ->helperText('Single: User can only select one item. Multiple: User can select many items.'),

                        Toggle::make('is_required')
                            ->label('Required')
                            ->default(false)
                            ->inline(false)
                            ->helperText('If enabled, customer must select from this additional option'),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                Section::make('Items')
                    ->schema([
                        Repeater::make('items')
                            ->relationship('items')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Extra Cheese'),

                                TextInput::make('additional_price')
                                    ->label('Additional Price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('Rp')
                                    ->minValue(0)
                                    ->default(0)
                                    ->placeholder('0'),

                                TextInput::make('stock')
                                    ->required()
                                    ->numeric()
                                    ->minValue(0)
                                    ->default(0)
                                    ->helperText('Set to 0 for unlimited'),

                                Toggle::make('is_available')
                                    ->label('Available')
                                    ->default(true)
                                    ->inline(false),
                            ])
                            ->columns(4)
                            ->defaultItems(1)
                            ->reorderable()
                            ->collapsible()
                            ->cloneable()
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? null)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'single' => 'info',
                        'multiple' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state) . ' Choice'),

                IconColumn::make('is_required')
                    ->boolean()
                    ->label('Required')
                    ->alignCenter(),

                TextColumn::make('items_count')
                    ->counts('items')
                    ->label('Total Items')
                    ->alignCenter()
                    ->badge()
                    ->color('warning'),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                  SelectFilter::make('type')
                    ->options([
                        'single' => 'Single Choice',
                        'multiple' => 'Multiple Choice',
                    ]),

                TernaryFilter::make('is_required')
                    ->label('Required')
                    ->placeholder('All')
                    ->trueLabel('Required only')
                    ->falseLabel('Optional only'),
            ])
            ->headerActions([
                CreateAction::make()
                    ->modalWidth('3xl'),
                AttachAction::make()
                    ->preloadRecordSelect()
                    ->color('info'),
            ])
            ->recordActions([
               EditAction::make()
                    ->modalWidth('3xl'),
                DetachAction::make()
                    ->label('Detach from this menu'),
                DeleteAction::make()
                    ->label('Delete this additional'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DetachBulkAction::make(),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
