<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class MenuCategory extends Model
{
    /** @use HasFactory<\Database\Factories\MenuCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function menus(): HasMany
    {
        return $this->hasMany(Menu::class, 'menu_category_id');
    }

    public function image(): MorphOne
    {
        return $this->morphOne(File::class, 'related');
    }
}
