import { Order } from '@/types/Order';
import { useState } from 'react';

interface OrderCardProps {
    order: Order;
    onUpdateStatus: (
        orderId: number,
        status: 'processing' | 'completed' | 'cancelled',
    ) => void;
    timeAgo: (date: string) => string;
}

export default function KitchenOrderCard({
    order,
    onUpdateStatus,
    timeAgo,
}: OrderCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusUpdate = async (
        status: 'processing' | 'completed' | 'cancelled',
    ) => {
        console.log(`Button clicked: Update order ${order.id} to ${status}`);
        setIsUpdating(true);
        onUpdateStatus(order.id, status);

        setTimeout(() => {
            setIsUpdating(false);
        }, 1000);
    };

    const statusColors = {
        pending: 'border-l-red-500 bg-red-500',
        processing: 'border-l-amber-500 bg-amber-600',
        completed: 'border-l-green-500 bg-green-600',
        cancelled: 'border-l-gray-500 bg-gray-600',
    };

    return (
        <div
            className={`overflow-hidden rounded-lg border border-l-6 border-zinc-300 bg-white ${statusColors[order.status]?.replace('bg-', 'border-l-')} `}
            style={{ animation: 'slideIn 0.5s ease-out' }}
        >
            <div className="flex h-full flex-col justify-between p-4">
                <div>
                    <div className="mb-3 flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold">{order.code}</h3>
                            <p className="text-sm text-zinc-500">
                                {order.customer_name}
                            </p>
                        </div>
                        <span
                            className={`${statusColors[order.status]} rounded-full px-3 py-1 text-xs font-semibold text-white`}
                        >
                            {order.status === 'pending'
                                ? 'NEW ORDER'
                                : order.status === 'processing'
                                  ? 'COOKING'
                                  : order.status.toUpperCase()}
                        </span>
                    </div>

                    <div className="0 mb-4 flex items-center gap-2 text-sm">
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{timeAgo(order.order_date)}</span>
                    </div>

                    <div className="scroll-y mb-4 max-h-96 space-y-3 overflow-y-auto bg-white">
                        {order.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg border border-zinc-300 p-4"
                            >
                                <div className="flex items-start justify-between font-semibold">
                                    <span>{item.menu.name}</span>
                                    <span className="font-semibold">
                                        {item.quantity}x
                                    </span>
                                </div>

                                {item.additionals &&
                                    item.additionals.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {item.additionals.map(
                                                (add, addIdx) => (
                                                    <div
                                                        key={addIdx}
                                                        className="text-sm"
                                                    >
                                                        + {add.quantity}x{' '}
                                                        {
                                                            add.additional_item
                                                                .name
                                                        }
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}

                                {item.notes && (
                                    <div className="mt-4 rounded-lg border border-zinc-300 p-4 py-3 text-sm text-gray-400 italic">
                                        {item.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    {order.status === 'pending' ? (
                        <button
                            onClick={() => handleStatusUpdate('processing')}
                            disabled={isUpdating}
                            className="disabled:bg-zinc-3000 flex-1 rounded-lg bg-zinc-200 px-4 py-2 font-semibold transition duration-200 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? 'Updating...' : 'Start Cooking'}
                        </button>
                    ) : (
                        <button
                            onClick={() => handleStatusUpdate('completed')}
                            disabled={isUpdating}
                            className="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition duration-200 hover:bg-primary disabled:cursor-not-allowed disabled:bg-green-800"
                        >
                            {isUpdating ? 'Updating...' : 'Complete'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
