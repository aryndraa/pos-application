<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Menu extends Model
{
    /** @use HasFactory<\Database\Factories\MenuFactory> */
    use HasFactory;

    protected $fillable = [
        'menu_category_id',
        'name',
        'sku',
        'price',
        'stock',
        'is_available',
        'recipe'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class, 'menu_category_id');
    }

    public function additionals(): BelongsToMany
    {
        return $this->belongsToMany(Additional::class, 'menu_additionals');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

     public function image(): MorphOne
    {
        return $this->morphOne(File::class, 'related');
    }
}
