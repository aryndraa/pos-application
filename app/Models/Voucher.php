<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voucher extends Model
{
    /** @use HasFactory<\Database\Factories\VoucherFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'type',
        'discount',
        'max_discount',
        'limit',
        'start_date',
        'end_date',
        'is_active'
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
