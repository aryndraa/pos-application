<?php

namespace App\Observers;

use App\Events\OrderCreated;
use App\Events\OrderStatusUpdated;
use App\Models\Order;

class OrderObserver
{
    private static $oldStatuses = [];

    public function created(Order $order)
    {
        \Log::info('OrderObserver: Order created', ['order_id' => $order->id]);
        
        // Broadcast event ketika order baru dibuat
        broadcast(new OrderCreated($order))->toOthers();
        
        \Log::info('OrderObserver: OrderCreated event broadcasted');
    }

    public function updating(Order $order)
    {
        // Simpan status lama di static property (bukan di model)
        self::$oldStatuses[$order->id] = $order->getOriginal('status');
    }

    public function updated(Order $order)
    {
        // Broadcast event ketika status order berubah
        if ($order->wasChanged('status')) {
            $oldStatus = self::$oldStatuses[$order->id] ?? null;
            
            broadcast(new OrderStatusUpdated($order, $oldStatus))->toOthers();
            
            // Clean up
            unset(self::$oldStatuses[$order->id]);
        }
    }
}

