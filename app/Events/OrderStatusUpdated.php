<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdated implements ShouldBroadcastNow // Ubah ke ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;
    public $oldStatus;

    public function __construct(Order $order, $oldStatus)
    {
        $this->order = $order->load(['items.menu', 'items.orderAdditionals']);
        $this->oldStatus = $oldStatus;
        
        \Log::info('OrderStatusUpdated Event constructed', [
            'order_id' => $this->order->id,
            'old_status' => $oldStatus,
            'new_status' => $this->order->status
        ]);
    }

    public function broadcastOn()
    {
        return new Channel('kitchen');
    }

    public function broadcastAs()
    {
        return 'order.status.updated';
    }

    public function broadcastWith()
    {
        \Log::info('OrderStatusUpdated broadcasting data', [
            'order_id' => $this->order->id
        ]);
        
        return [
            'order' => $this->order,
            'old_status' => $this->oldStatus
        ];
    }
}
