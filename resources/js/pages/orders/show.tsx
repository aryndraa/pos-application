import Bill from '@/components/Bill';
import AppLayout from '@/layouts/AppLayout';
import { OrderItem } from '@/types/Order';
import { formatRupiah } from '@/utils/formatRupiah';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';

interface ShowProps extends PageProps {
    id: number;
    code: string;
    customer_name: string;
    order_date: string;
    total_price: number;
    pay: number;
    change: number;
    payment_method: string;
    status: string;
    items: OrderItem[];
}

export default function Show() {
    const {
        id,
        code,
        customer_name,
        order_date,
        total_price,
        pay,
        change,
        payment_method,
        status,
        items,
    } = usePage<ShowProps>().props;

    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-full lg:col-span-6">
                    <div className="sticky top-4 rounded-lg border border-zinc-300 p-4 lg:p-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">
                                Detail Order
                            </h1>
                            <Bill
                                change={change}
                                code={code}
                                customer_name={customer_name}
                                items={items}
                                order_date={order_date}
                                pay={pay}
                                total_price={total_price}
                            />
                        </div>

                        <div className="my-4 flex items-center justify-between border-y border-zinc-300 py-4 text-primary">
                            <h2 className="text-lg font-semibold capitalize md:text-2xl">
                                {code}
                            </h2>
                        </div>

                        <ul>
                            <li className="flex items-center justify-between border-b border-zinc-300 pb-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Customer Name
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {customer_name}
                                </span>
                            </li>

                            <li className="flex items-center justify-between border-b border-zinc-300 py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Order Date
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {new Date(order_date).toLocaleDateString(
                                        'id-ID',
                                        {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        },
                                    )}
                                </span>
                            </li>

                            <li className="flex items-center justify-between border-b border-zinc-300 py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Total Price
                                </h3>
                                <span className="font-medium md:text-lg">
                                    {formatRupiah(total_price)}
                                </span>
                            </li>

                            <li className="flex items-center justify-between border-b border-zinc-300 py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Payment
                                </h3>
                                <span className="font-medium md:text-lg">
                                    {formatRupiah(pay)}
                                </span>
                            </li>

                            <li className="flex items-center justify-between border-b border-zinc-300 py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Payment Method
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {payment_method}
                                </span>
                            </li>

                            <li className="flex items-center justify-between border-b border-zinc-300 py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Money Change
                                </h3>
                                <span className="font-medium md:text-lg">
                                    {formatRupiah(change)}
                                </span>
                            </li>

                            <li className="flex items-center justify-between py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Status
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {status}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-span-full lg:col-span-6">
                    <div className="mb-4 rounded-lg border border-zinc-300 p-4 lg:p-5">
                        <h1 className="text-lg font-semibold">List Item</h1>
                    </div>

                    <ul className="flex flex-col gap-4">
                        {items.map((item, idx) => (
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

                                <div className="grid grid-cols-5 gap-2">
                                    <Link
                                        href={`/menu/${item.menu.id}/recipe`}
                                        className="col-span-3 mt-4 w-full rounded-lg bg-primary p-2.5 text-center font-medium text-white"
                                    >
                                        View Recipe
                                    </Link>
                                    <Link
                                        href={`/menu/${item.menu.id}`}
                                        className="col-span-2 mt-4 w-full rounded-lg bg-primary/10 p-2.5 text-center font-medium text-primary"
                                    >
                                        View Menu
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </section>
        </AppLayout>
    );
}
