import OrderCard from '@/components/orders/OrderCard';
import AppLayout from '@/layouts/AppLayout';
import { OrderList } from '@/types/Order';
import { usePage } from '@inertiajs/react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';

interface OrderProps extends PageProps {
    orders: OrderList;
}

export default function Orders() {
    const { orders } = usePage<OrderProps>().props;

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

    return (
        <AppLayout>
            <section>
                <div className="mb-6 rounded-lg border border-zinc-300 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-primary md:text-3xl">
                                List Orders
                            </h1>
                            z
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
                                timeAgo={timeAgo}
                            />
                        ))}
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
