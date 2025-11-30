<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreated implements ShouldBroadcastNow // Ubah ke ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order->load(['items.menu', 'items.orderAdditionals']);
        
        \Log::info('OrderCreated Event constructed', [
            'order_id' => $this->order->id,
            'order_code' => $this->order->code
        ]);
    }

    public function broadcastOn()
    {
        return new Channel('kitchen');
    }

    public function broadcastAs()
    {
        return 'order.created';
    }

    public function broadcastWith()
    {
        \Log::info('OrderCreated broadcasting data', [
            'order_id' => $this->order->id
        ]);
        
        return [
            'order' => $this->order
        ];
    }
}


