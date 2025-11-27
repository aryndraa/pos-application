import { JSX, useState } from 'react';
import {
    MdAccessTimeFilled,
    MdOutlineSearch,
    MdRoomService,
} from 'react-icons/md';

interface OrderItemType {
    id: number;
    customer_name: string;
    status: string;
    order_date: string;
    items_count?: number;
}

interface OrderListProps {
    inProgressOrders: OrderItemType[];
    waitingPaymentOrders: OrderItemType[];
}

export default function OrderList({
    inProgressOrders,
    waitingPaymentOrders,
}: OrderListProps) {
    const [activeTab, setActiveTab] = useState<
        'in-progress' | 'waiting-payment'
    >('in-progress');

    const [searchQuery, setSearchQuery] = useState('');

    const ordersToShow =
        activeTab === 'in-progress' ? inProgressOrders : waitingPaymentOrders;

    const filteredOrders = ordersToShow.filter((order) => {
        const q = searchQuery.toLowerCase();

        const nameMatch = order.customer_name.toLowerCase().includes(q);

        const dateString = new Date(order.order_date).toLocaleDateString(
            'id-ID',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            },
        );

        const dateMatch = dateString.toLowerCase().includes(q);

        return nameMatch || dateMatch;
    });

    let numbering = 1;

    return (
        <div className="flex h-full max-h-[95vh] min-h-[95vh] flex-col gap-4 rounded-lg border border-zinc-300 p-4 pb-6">
            <div className="grid grid-cols-2 rounded-lg border border-zinc-300 p-2">
                <button
                    className={`rounded-lg p-2 text-sm font-medium transition ${
                        activeTab === 'in-progress'
                            ? 'bg-primary text-white'
                            : 'text-zinc-400'
                    }`}
                    onClick={() => setActiveTab('in-progress')}
                >
                    In Progress
                </button>

                <button
                    className={`rounded-lg p-2 text-sm font-medium transition ${
                        activeTab === 'waiting-payment'
                            ? 'bg-primary text-white'
                            : 'text-zinc-400'
                    }`}
                    onClick={() => setActiveTab('waiting-payment')}
                >
                    Waiting Payment
                </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-zinc-300 p-4 py-3 md:gap-4 md:py-4">
                <MdOutlineSearch className="text-2xl" />
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm outline-none placeholder:text-zinc-400 md:text-base"
                />
            </div>

            <ul
                className={`scroll-y w-full space-y-2 rounded-lg ${
                    filteredOrders.length > 6 && 'overflow-y-scroll pr-2'
                }`}
            >
                {filteredOrders.slice(0, 15).map((order) => (
                    <li
                        key={order.id}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg p-3 py-2 transition hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="rounded-lg border border-zinc-300 p-2 text-sm font-semibold text-primary md:p-3">
                                #{numbering++}
                            </span>

                            <div className="space-y-1">
                                <h4 className="text-xs font-medium md:text-[15px]">
                                    {order.customer_name}
                                </h4>
                                <p className="text-xs text-gray-500 md:text-sm">
                                    {order.items_count ?? 0} Items –{' '}
                                    {new Date(
                                        order.order_date,
                                    ).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        <OrderStatus status={order.status} />
                    </li>
                ))}

                {filteredOrders.length > 15 && (
                    <li className="rounded-lg bg-gray-100 py-2 text-center">
                        <span className="w-full text-sm font-medium text-gray-600">
                            {filteredOrders.length - 15} Other orders
                        </span>
                    </li>
                )}

                {filteredOrders.length === 0 && (
                    <li className="rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-500">
                        No orders found.
                    </li>
                )}
            </ul>

            {ordersToShow.length > 15 && filteredOrders && (
                <button className="w-full cursor-pointer rounded-lg bg-primary p-2 text-sm font-semibold text-white lg:p-3">
                    {' '}
                    View More Orders{' '}
                </button>
            )}
        </div>
    );
}

function OrderStatus({ status }: { status: string }) {
    const configs: Record<
        string,
        { bg: string; icon: JSX.Element; sub: string }
    > = {
        pending: {
            bg: 'bg-amber-400',
            icon: <MdRoomService className="text-sm" />,
            sub: 'Ready to serve',
        },
        processing: {
            bg: 'bg-zinc-200',
            icon: <MdAccessTimeFilled className="text-sm" />,
            sub: 'Cooking Now',
        },
        ready: {
            bg: 'bg-green-500',
            icon: <MdAccessTimeFilled className="text-sm" />,
            sub: 'Ready to serve',
        },
    };

    const c = configs[status];
    if (!c) return null;

    return (
        <div className="flex flex-col items-end">
            <div
                className={`flex w-fit items-center gap-1.5 rounded-sm ${c.bg} px-2.5 py-1.5 text-xs font-semibold text-dark-300 capitalize md:mb-2 md:p-3 md:py-2`}
            >
                {c.icon}
                {status}
            </div>

            <div className="hidden items-center gap-2 md:flex">
                <span className={`size-2.5 rounded-full ${c.bg}`}></span>
                <p className="text-end text-xs text-gray-500">{c.sub}</p>
            </div>
        </div>
    );
}
