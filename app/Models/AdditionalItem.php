<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class AdditionalItem extends Model
{
    /** @use HasFactory<\Database\Factories\AdditionalItemFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'additional_id',
        'additional_price',
        'stock',    
        'is_available',
    ];

    public function additional(): BelongsTo
    {
        return $this->belongsTo(Additional::class);
    }

    public function orders()
    {
        return $this->hasMany(OrderItemAdditional::class);
    }

     public function image(): MorphOne
    {
        return $this->morphOne(File::class, 'related');
    }
}
