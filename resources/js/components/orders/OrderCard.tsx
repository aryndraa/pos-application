interface Menu {
    id: number;
    name: string;
}

interface AdditionalItem {
    id: number;
    name: string;
}

interface OrderItemAdditional {
    id: number;
    quantity: number;
    unit_price: number;
    additional_item: AdditionalItem;
}

interface OrderItem {
    id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    notes: string;
    menu: Menu;
    additionals: OrderItemAdditional[];
}

interface Order {
    id: number;
    code: string;
    customer_name: string;
    order_date: string;
    total_price: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    items: OrderItem[];
}

interface OrderCardProps {
    order: Order;
    timeAgo: (date: string) => string;
}

export default function OrderCard({ order, timeAgo }: OrderCardProps) {
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
            <div className="p-4">
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

                <div className="mb-4 space-y-3">
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
                                        {item.additionals.map((add, addIdx) => (
                                            <div
                                                key={addIdx}
                                                className="text-sm"
                                            >
                                                + {add.quantity}x{' '}
                                                {add.additional_item.name}
                                            </div>
                                        ))}
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
        </div>
    );
}
