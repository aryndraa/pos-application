import LogoutButton from '@/components/actions/LogoutButton';
import KitchenOrderCard from '@/components/kitchen/KitchenOrderCard';
import { Order } from '@/types/Order';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
                    console.log(err);
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
                        <LogoutButton url="/kitchen/auth/logout" />
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {orders.map((order) => (
                        <KitchenOrderCard
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
