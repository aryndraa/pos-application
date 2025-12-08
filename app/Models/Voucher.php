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

     public function isValid(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        $now = now();
        if ($now->lt($this->start_date) || $now->gt($this->end_date)) {
            return false;
        }

        if ($this->limit > 0) {
            $usedCount = $this->orders()->count();
            if ($usedCount >= $this->limit) {
                return false;
            }
        }

        return true;
    }

    /**
     * Hitung discount amount
     */
    public function calculateDiscount(float $subtotal): float
    {
        if ($this->type === 'percentage') {
            $discount = ($subtotal * $this->discount) / 100;
            
            if ($this->max_discount > 0 && $discount > $this->max_discount) {
                $discount = $this->max_discount;
            }
            
            return $discount;
        }
        
        return min($this->discount, $subtotal);
    }

    /**
     * Get validation error message
     */
    public function getValidationError(): ?string
    {
        if (!$this->is_active) {
            return 'Voucher is not active';
        }

        $now = now();
        if ($now->lt($this->start_date)) {
            return 'Voucher is not yet valid';
        }

        if ($now->gt($this->end_date)) {
            return 'Voucher has expired';
        }

        if ($this->limit > 0) {
            $usedCount = $this->orders()->count();
            if ($usedCount >= $this->limit) {
                return 'Voucher usage limit has been reached';
            }
        }

        return null;
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    
}
