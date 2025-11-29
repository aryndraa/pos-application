<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Additional extends Model
{
    /** @use HasFactory<\Database\Factories\AdditionalFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'is_required',
        'type'
    ];

    public function items(): HasMany
    {
        return $this->hasMany(AdditionalItem::class);
    }

    public function menus(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'menu_additionals');
    }
}
