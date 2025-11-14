import { useState } from 'react';
import { MdOutlineSearch, MdRoomService } from 'react-icons/md';

interface OrderItem {
    id: number;
    customer: string;
    items: number;
    date: string;
    status: string;
}

export default function OrderList() {
    const [activeTab, setActiveTab] = useState<
        'in-progress' | 'waiting-payment'
    >('in-progress');

    const inProgressOrders: OrderItem[] = [
        {
            id: 1,
            customer: 'Gilbrut James',
            items: 4,
            date: 'Tomorrow',
            status: 'Pending',
        },
        {
            id: 2,
            customer: 'Alex Morgan',
            items: 3,
            date: 'Today',
            status: 'Processing',
        },
    ];

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

    const ordersToShow =
        activeTab === 'in-progress' ? inProgressOrders : waitingPaymentOrders;

    return (
        <div className="flex h-full flex-col gap-4 rounded-lg bg-white p-4">
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

            <ul className="w-full space-y-2">
                {ordersToShow.map((order) => (
                    <li
                        key={order.id}
                        className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3 md:text-base">
                                #{order.id}
                            </span>
                            <div>
                                <h4 className="text-sm font-medium md:text-base">
                                    {order.customer}
                                </h4>
                                <p className="text-xs text-gray-500 md:text-sm">
                                    {order.items} Items – {order.date}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 md:mb-2 md:p-4 md:py-2">
                                <MdRoomService className="text-base md:text-lg" />
                                {order.status}
                            </div>
                            <div className="hidden items-center gap-2 md:flex">
                                <span className="size-2.5 rounded-full bg-secondary"></span>
                                <p className="text-end text-xs text-gray-500">
                                    Ready to serve
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
