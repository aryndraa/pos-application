import { useState } from 'react';
import {
    MdAccessTimeFilled,
    MdOutlineSearch,
    MdRoomService,
} from 'react-icons/md';

interface InProgressOrderType {
    id: number;
    customer_name: string;
    status: string;
    order_date: string;
}

interface OrderItem {
    id: number;
    customer: string;
    items: number;
    date: string;
    status: string;
}

export default function OrderList({
    inProgressOrders,
}: {
    inProgressOrders: InProgressOrderType[];
}) {
    const [activeTab, setActiveTab] = useState<
        'in-progress' | 'waiting-payment'
    >('in-progress');

    const waitingPaymentOrders: OrderItem[] = [
        {
            id: 10,
            customer: 'William Hart',
            items: 2,
            date: 'Today',
            status: 'Awaiting Payment',
        },
        {
            id: 11,
            customer: 'Sarah Lee',
            items: 5,
            date: 'Tomorrow',
            status: 'Awaiting Payment',
        },
    ];

    const mappedInProgress: OrderItem[] = inProgressOrders.map((o) => ({
        id: o.id,
        customer: o.customer_name,
        items: 0,
        date: new Date(o.order_date).toLocaleDateString(),
        status: o.status,
    }));

    let numbering = 1;

    const ordersToShow =
        activeTab === 'in-progress' ? mappedInProgress : waitingPaymentOrders;

    return (
        <div className="flex h-full max-h-[95vh] flex-col gap-4 rounded-lg bg-white p-4 pb-6">
            <div className="grid grid-cols-2 rounded-lg bg-gray-100 p-2">
                <button
                    className={`rounded-lg p-2 text-sm font-medium transition ${
                        activeTab === 'in-progress'
                            ? 'bg-white text-dark-300'
                            : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('in-progress')}
                >
                    In Progress
                </button>

                <button
                    className={`rounded-lg p-2 text-sm font-medium transition ${
                        activeTab === 'waiting-payment'
                            ? 'bg-white text-dark-300'
                            : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('waiting-payment')}
                >
                    Waiting Payment
                </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-4 py-3 md:gap-4 md:py-4">
                <MdOutlineSearch className="text-2xl" />
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="text-sm outline-none placeholder:text-gray-400 md:text-base"
                />
            </div>

            <ul
                className={`scroll-y w-full space-y-2 rounded-lg ${
                    ordersToShow.length > 6 && 'overflow-y-scroll pr-2'
                }`}
            >
                {ordersToShow.slice(0, 15).map((order) => (
                    <li
                        key={order.id}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg p-3 py-2 transition hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3">
                                #{numbering++}
                            </span>

                            <div className="space-y-1">
                                <h4 className="text-xs font-medium md:text-[15px]">
                                    {order.customer}
                                </h4>
                                <p className="text-xs text-gray-500 md:text-sm">
                                    {order.items} Items – {order.date}
                                </p>
                            </div>
                        </div>

                        {order.status === 'pending' ? (
                            <div className="flex flex-col items-end">
                                <div className="flex w-fit items-center gap-1.5 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 capitalize md:mb-2 md:p-3 md:py-2">
                                    <MdRoomService className="text-sm" />
                                    {order.status}
                                </div>
                                <div className="hidden items-center gap-2 md:flex">
                                    <span className="size-2.5 rounded-full bg-secondary"></span>
                                    <p className="text-end text-xs text-gray-500">
                                        Ready to serve
                                    </p>
                                </div>
                            </div>
                        ) : order.status === 'processing' ? (
                            <div className="flex flex-col items-end">
                                <div className="flex w-fit items-center gap-1.5 rounded-sm bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-dark-300 capitalize md:mb-2 md:p-3 md:py-2">
                                    <MdAccessTimeFilled className="text-sm" />
                                    {order.status}
                                </div>
                                <div className="hidden items-center gap-2 md:flex">
                                    <span className="size-2.5 rounded-full bg-gray-200"></span>
                                    <p className="text-end text-xs text-gray-500">
                                        Cooking Now
                                    </p>
                                </div>
                            </div>
                        ) : order.status === 'ready' ? (
                            <div className="flex flex-col items-end">
                                <div className="flex w-fit items-center gap-1.5 rounded-sm bg-green-400 px-2.5 py-1.5 text-xs font-semibold text-dark-300 capitalize md:mb-2 md:p-3 md:py-2">
                                    <MdAccessTimeFilled className="text-sm" />
                                    {order.status}
                                </div>
                                <div className="hidden items-center gap-2 md:flex">
                                    <span className="size-2.5 rounded-full bg-green-400"></span>
                                    <p className="text-end text-xs text-gray-500">
                                        Ready to serve
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </li>
                ))}
                {ordersToShow.length > 15 && (
                    <li className="rounded-lg bg-gray-100 py-2 text-center">
                        <span className="w-full text-sm font-medium text-gray-600">
                            {ordersToShow.length - 10} Other orders
                        </span>
                    </li>
                )}
            </ul>
            {ordersToShow.length > 15 && (
                <button className="w-full cursor-pointer rounded-lg bg-secondary p-2 text-sm font-semibold">
                    View More
                </button>
            )}
        </div>
    );
}
