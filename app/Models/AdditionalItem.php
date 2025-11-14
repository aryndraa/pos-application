<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdditionalItem extends Model
{
    /** @use HasFactory<\Database\Factories\AdditionalItemFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'additional_id',
        'additional_price',
    ];

    public function additional(): BelongsTo
    {
        return $this->belongsTo(Additional::class);
    }

    public function orders()
    {
        return $this->hasMany(OrderItemAdditional::class);
    }
}
