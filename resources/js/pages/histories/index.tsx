import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import AppLayout from '@/layouts/AppLayout';
import { Order } from '@/types/Order';
import { PaginatedData } from '@/types/Pagination';
import { formatRupiah } from '@/utils/formatRupiah';
import { Link, router, usePage } from '@inertiajs/react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';
import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { TiArrowUnsorted } from 'react-icons/ti';

interface OrderProps extends PageProps {
    orders: PaginatedData<Order>;
}

export default function Index() {
    const { orders } = usePage<OrderProps>().props;
    const startNumber = (orders.current_page - 1) * orders.per_page;
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);

        const query = new URLSearchParams(window.location.search);

        if (value) query.set('search', value);
        else query.delete('search');

        router.get(
            '/cashier/histories?' + query.toString(),
            {},
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    };

    const handleSort = (order: string, direction: string) => {
        const query = new URLSearchParams(window.location.search);

        if (order) query.set('orderBy', order);
        else query.delete('orderBy');

        if (direction) query.set('direction', direction);
        else query.delete('direction');

        router.get(
            '/cashier/histories?' + query.toString(),
            {},
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    };

    const toggleSort = (field: string) => {
        const currentOrder = new URLSearchParams(window.location.search).get(
            'orderBy',
        );
        const currentDirection = new URLSearchParams(
            window.location.search,
        ).get('direction');

        const newDirection =
            currentOrder === field && currentDirection === 'asc'
                ? 'desc'
                : 'asc';

        handleSort(field, newDirection);
    };

    return (
        <AppLayout>
            <div className="rounded-lg border border-zinc-300 bg-white p-4 lg:p-5">
                <div className="flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
                    <h1 className="text-xl font-semibold">List Orders</h1>
                    <div className="flex items-stretch gap-4">
                        <Search
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search orders..."
                            className="w-56"
                            delay={100}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    No
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    Code
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    Customer Name
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    <button
                                        onClick={() => toggleSort('order_date')}
                                        className="flex items-center gap-2"
                                    >
                                        Order Date
                                        <TiArrowUnsorted />
                                    </button>
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    <button
                                        onClick={() =>
                                            toggleSort('total_price')
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        Total Price
                                        <TiArrowUnsorted />
                                    </button>
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    Payment
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                    Status
                                </th>

                                <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data && orders.data.length > 0 ? (
                                <>
                                    {orders.data.map((order, index) => (
                                        <tr
                                            className="transition duration-300 hover:bg-zinc-100"
                                            key={index}
                                        >
                                            <td className="w-min px-3 py-2 text-nowrap">
                                                #{startNumber + index + 1}
                                            </td>

                                            <td className="w-min px-3 py-2 text-nowrap">
                                                <Link
                                                    href={`/cashier/orders/${order.id}`}
                                                    className="underline"
                                                >
                                                    {order.code}
                                                </Link>
                                            </td>
                                            <td className="w-min px-3 py-2 text-nowrap">
                                                <Link
                                                    href={`/cashier/orders/${order.id}`}
                                                    className="underline"
                                                >
                                                    {order.customer_name}
                                                </Link>
                                            </td>
                                            <td className="w-min px-3 py-2 text-nowrap">
                                                {order.order_date}
                                            </td>
                                            <td className="w-min px-3 py-2 text-nowrap">
                                                {formatRupiah(
                                                    order.total_price,
                                                )}
                                            </td>
                                            <td className="w-min px-3 py-2 text-nowrap capitalize">
                                                {order.payment_method}
                                            </td>
                                            <td className="w-min px-3 py-2 text-nowrap capitalize">
                                                {order.status}
                                            </td>
                                            <td className="w-min px-3 py-2 text-nowrap">
                                                <Link
                                                    href={`/cashier/orders/${order.id}`}
                                                    className="flex size-10 items-center justify-center rounded-lg bg-primary text-lg text-white"
                                                >
                                                    <FaRegEye />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr className="w-full">
                                    <td
                                        colSpan={100}
                                        className="rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-500"
                                    >
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="mt-4 flex w-full justify-center border-t py-4">
                        <Pagination links={orders.links} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
