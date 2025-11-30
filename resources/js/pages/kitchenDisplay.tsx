import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

interface KitchenDisplayProps {
    initialOrders: Order[];
}

export default function KitchenDisplay({
    initialOrders = [],
}: KitchenDisplayProps) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [connectionStatus, setConnectionStatus] = useState<
        'connecting' | 'connected' | 'disconnected' | 'error'
    >('connecting');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!window.Echo) {
            setConnectionStatus('error');
            return;
        }

        console.log('🔧 Setting up Echo listener...');
        console.log('📡 Echo config:', {
            broadcaster: window.Echo.connector.name,
            socket_id: window.Echo.socketId(),
        });

        const channel = window.Echo.channel('kitchen');

        setConnectionStatus('connected');

        channel.listen('.order.created', (data: { order: Order }) => {
            setOrders((prevOrders) => {
                const exists = prevOrders.some((o) => o.id === data.order.id);

                if (exists) {
                    return prevOrders;
                }

                const newOrders = [data.order, ...prevOrders];
                return newOrders;
            });
        });

        channel.listen(
            '.order.status.updated',
            (data: { order: Order; old_status: string }) => {
                setOrders((prevOrders) => {
                    console.log(
                        'Previous orders:',
                        prevOrders.map((o) => ({ id: o.id, status: o.status })),
                    );

                    if (
                        data.order.status === 'completed' ||
                        data.order.status === 'cancelled'
                    ) {
                        console.log(
                            `Removing order ${data.order.id} because status is ${data.order.status}`,
                        );
                        const filtered = prevOrders.filter(
                            (o) => o.id !== data.order.id,
                        );
                        return filtered;
                    }

                    const updated = prevOrders.map((o) => {
                        if (o.id === data.order.id) {
                            return data.order;
                        }
                        return o;
                    });

                    console.log(
                        'Orders after update:',
                        updated.map((o) => ({ id: o.id, status: o.status })),
                    );
                    return updated;
                });
            },
        );

        if (window.Echo.connector && window.Echo.connector.pusher) {
            window.Echo.connector.pusher.connection.bind(
                'error',
                (err: any) => {
                    setConnectionStatus('error');
                },
            );

            window.Echo.connector.pusher.connection.bind('connected', () => {
                setConnectionStatus('connected');
            });

            window.Echo.connector.pusher.connection.bind('disconnected', () => {
                setConnectionStatus('disconnected');
            });

            window.Echo.connector.pusher.connection.bind('connecting', () => {
                setConnectionStatus('connecting');
            });
        }

        console.log('Echo setup complete');

        return () => {
            console.log('Cleaning up Echo listener');
            window.Echo.leave('kitchen');
        };
    }, []);

    const updateOrderStatus = (
        orderId: number,
        status: 'processing' | 'completed' | 'cancelled',
    ) => {
        console.log(`🔄 Updating order ${orderId} to status ${status}`);
        console.log(
            'Orders before optimistic update:',
            orders.map((o) => ({ id: o.id, status: o.status })),
        );

        setOrders((prevOrders) => {
            console.log('Performing optimistic update...');

            if (status === 'completed' || status === 'cancelled') {
                console.log(`Removing order ${orderId} optimistically`);
                const filtered = prevOrders.filter((o) => o.id !== orderId);
                console.log('After optimistic removal:', filtered.length);
                return filtered;
            }

            const updated = prevOrders.map((o) => {
                if (o.id === orderId) {
                    console.log(
                        `Updating order ${o.id} status from ${o.status} to ${status}`,
                    );
                    return { ...o, status };
                }
                return o;
            });

            console.log(
                'After optimistic update:',
                updated.map((o) => ({ id: o.id, status: o.status })),
            );
            return updated;
        });

        router.post(
            `/kitchen/orders/${orderId}/status`,
            { status },
            {
                preserveState: true,
                preserveScroll: true,
                only: [],
                onSuccess: () => {
                    console.log(
                        `✅ Server confirmed status update for order ${orderId}`,
                    );
                },
                onError: (errors) => {
                    console.error('❌ Error updating status:', errors);
                    alert('Failed to update order status');
                    window.location.reload();
                },
            },
        );
    };

    const timeAgo = (date: string) => {
        const seconds = Math.floor(
            (new Date().getTime() - new Date(date).getTime()) / 1000,
        );

        if (seconds < 60) return `${seconds}s ago`;

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    const getConnectionStatusColor = () => {
        switch (connectionStatus) {
            case 'connected':
                return 'bg-green-500';
            case 'connecting':
                return 'bg-yellow-500';
            case 'disconnected':
                return 'bg-orange-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="mb-6 rounded-lg border border-zinc-300 bg-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-primary md:text-3xl">
                            Kitchen Display
                        </h1>
                        <p className="mt-1 text-xs text-gray-400 md:text-sm">
                            Real-time Orders Monitor
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <button
                            onClick={() => {
                                console.log('🧪 Testing Echo connection...');
                                console.log('Echo object:', window.Echo);
                                console.log(
                                    'Socket ID:',
                                    window.Echo?.socketId(),
                                );
                                console.log(
                                    'Connector:',
                                    window.Echo?.connector,
                                );
                                console.log('Current orders state:', orders);
                                alert('Check console for Echo debug info');
                            }}
                            className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                        >
                            🧪 Test Echo
                        </button> */}
                        <div className="text-right">
                            <div className="text-lg font-semibold md:text-2xl">
                                {currentTime.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                            <div className="flex items-center gap-2 md:mt-2">
                                <div
                                    className={`h-3 w-3 ${getConnectionStatusColor()} rounded-full ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`}
                                ></div>
                                <span className="text-xs font-medium text-zinc-500 capitalize md:text-sm">
                                    {connectionStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="mb-4 text-6xl">😴</div>
                    <h3 className="text-2xl font-bold text-gray-400">
                        No Active Orders
                    </h3>
                    <p className="mt-2 text-gray-500">
                        Waiting for new orders...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onUpdateStatus={updateOrderStatus}
                            timeAgo={timeAgo}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface OrderCardProps {
    order: Order;
    onUpdateStatus: (
        orderId: number,
        status: 'processing' | 'completed' | 'cancelled',
    ) => void;
    timeAgo: (date: string) => string;
}

function OrderCard({ order, onUpdateStatus, timeAgo }: OrderCardProps) {
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

                <div className="flex gap-2">
                    {order.status === 'pending' && (
                        <button
                            onClick={() => handleStatusUpdate('processing')}
                            disabled={isUpdating}
                            className="disabled:bg-zinc-3000 flex-1 rounded-lg bg-zinc-200 px-4 py-2 font-semibold transition duration-200 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? 'Updating...' : 'Start Cooking'}
                        </button>
                    )}
                    <button
                        onClick={() => handleStatusUpdate('completed')}
                        disabled={isUpdating}
                        className="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition duration-200 hover:bg-primary disabled:cursor-not-allowed disabled:bg-green-800"
                    >
                        {isUpdating ? 'Updating...' : 'Complete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);
