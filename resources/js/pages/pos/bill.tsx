import AppLayout from '@/layouts/AppLayout';
import { formatRupiah } from '@/utils/formatRupiah';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';

interface BillItem {
    id: number;
    menu: { name: string };
    quantity: number;
    unit_price: number;
    subtotal: number;
}

interface BillProps extends PageProps {
    code: string;
    customer_name: string;
    order_date: string;
    total_price: number;
    pay: number;
    change: number;
    items: BillItem[];
}

export default function Bill() {
    const {
        id,
        code,
        customer_name,
        order_date,
        total_price,
        pay,
        change,
        items,
    } = usePage<BillProps>().props;

    return (
        <AppLayout>
            <section className="flex min-h-[80dvh] w-full items-center justify-center">
                <div className="w-md rounded-lg border border-zinc-300 bg-white p-4 shadow-lg">
                    <div className="text-center">
                        <h2 className="mb-2 text-xl font-bold">POS APP</h2>
                        <p className="text-sm">Jl. Kebagusan No. 12</p>
                        <p className="text-sm">Telp: 0812-3456-7890</p>
                        <div className="my-3 border-b border-dashed border-zinc-400" />
                    </div>

                    <div className="text-sm">
                        <p>
                            <span className="font-semibold">Order:</span> {code}
                        </p>
                        <p>
                            <span className="font-semibold">Customer:</span>{' '}
                            {customer_name}
                        </p>
                        <p>
                            <span className="font-semibold">Date:</span>{' '}
                            {order_date}
                        </p>
                        <div className="my-3 border-b border-dashed border-zinc-400" />
                    </div>

                    <div className="text-sm">
                        {items.map((i) => (
                            <div key={i.id} className="mb-2">
                                <div className="flex justify-between">
                                    <span>{i.menu.name}</span>
                                    <span>{formatRupiah(i.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-zinc-600">
                                    <span>
                                        {i.quantity} ×{' '}
                                        {formatRupiah(i.unit_price)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="my-3 border-b border-dashed border-zinc-400" />
                    </div>

                    <div className="text-sm">
                        <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-semibold">
                                {formatRupiah(total_price)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pay:</span>
                            <span>{formatRupiah(pay)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Change:</span>
                            <span>{formatRupiah(change)}</span>
                        </div>
                    </div>

                    <div className="my-3 border-b border-dashed border-zinc-400" />

                    <p className="text-center text-xs">
                        Terima kasih telah berbelanja!
                    </p>

                    <Link
                        href="/pos"
                        className="mt-3 flex w-full items-center justify-center rounded bg-primary py-2 text-sm text-white"
                    >
                        Back
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
