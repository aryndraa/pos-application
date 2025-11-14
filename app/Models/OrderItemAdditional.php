<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItemAdditional extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemAdditionalFactory> */
    use HasFactory;

    public $fillable = [
        'order_item_id',
        'additional_item_id',
        'quantity',
        'unit_price',
    ];

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }

    public function additionalItem()
    {
        return $this->belongsTo(AdditionalItem::class);
    }
}
