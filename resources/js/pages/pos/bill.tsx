import AppLayout from '@/layouts/AppLayout';
import { PageProps } from '@/types';
import { formatRupiah } from '@/utils/formatRupiah';
import { Link, usePage } from '@inertiajs/react';

interface AdditionalItem {
    id: number;
    quantity: number;
    unit_price: number;
    additional_item: {
        id: number;
        name: string;
    };
}

interface BillItem {
    id: number;
    menu: { name: string };
    quantity: number;
    unit_price: number;
    subtotal: number;
    additionals?: AdditionalItem[];
}

interface BillProps extends PageProps {
    code: string;
    customer_name: string;
    order_date: string;
    subtotal_price: number;
    voucher?: {
        code: string;
        discount_type: string;
        discount_value: number;
    } | null;
    total_discount: number;
    total_price: number;
    pay: number;
    change: number;
    cashier: string;
    items: BillItem[];
}

export default function Bill() {
    const {
        code,
        customer_name,
        order_date,
        subtotal_price,
        voucher,
        total_discount,
        total_price,
        pay,
        change,
        cashier,
        items,
    } = usePage<BillProps>().props;

    return (
        <AppLayout>
            <section className="flex min-h-[80dvh] w-full items-center justify-center">
                <div className="w-md rounded-lg border border-zinc-300 bg-white p-5 shadow-lg">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="mb-1 text-xl font-bold tracking-wide">
                            POS APP
                        </h2>
                        <p className="text-xs">Jl. Kebagusan No. 12</p>
                        <p className="text-xs">Telp: 0812-3456-7890</p>
                        <div className="my-3 border-b border-dashed border-zinc-400" />
                    </div>

                    {/* Info */}
                    <div className="text-sm leading-relaxed">
                        <p>
                            <span className="font-semibold">Order:</span> {code}
                        </p>
                        <p>
                            <span className="font-semibold">Customer:</span>{' '}
                            {customer_name}
                        </p>
                        <p>
                            <span className="font-semibold">Cashier:</span>{' '}
                            {cashier}
                        </p>
                        <p>
                            <span className="font-semibold">Date:</span>{' '}
                            {order_date}
                        </p>
                        <div className="my-3 border-b border-dashed border-zinc-400" />
                    </div>

                    <div className="text-sm">
                        {items.map((i) => (
                            <div key={i.id} className="mb-3">
                                <div className="mb-2 flex justify-between">
                                    <span className="font-medium">
                                        {i.menu.name} x {i.quantity}
                                    </span>
                                    <span className="font-medium">
                                        {formatRupiah(i.subtotal)}
                                    </span>
                                </div>

                                <div className="flex gap-4 text-xs text-zinc-600">
                                    <span>Price / Pcs :</span>
                                    <span>{formatRupiah(i.unit_price)}</span>
                                </div>

                                {i.additionals && i.additionals.length > 0 && (
                                    <div className="space-y-1 text-xs text-zinc-700">
                                        {i.additionals.map((add) => (
                                            <div
                                                key={add.id}
                                                className="flex gap-4"
                                            >
                                                <span>
                                                    + {add.additional_item.name}
                                                    {add.quantity > 1 &&
                                                        ` (x${add.quantity})`}{' '}
                                                    :
                                                </span>

                                                <span>
                                                    {formatRupiah(
                                                        add.unit_price *
                                                            add.quantity,
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="my-3 border-b border-dashed border-zinc-400" />
                    </div>

                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatRupiah(subtotal_price)}</span>
                        </div>

                        {voucher && (
                            <div className="flex justify-between">
                                <span>Voucher ({voucher.code}):</span>
                                <span>-{formatRupiah(total_discount)}</span>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <span>Total Discount:</span>
                            <span>-{formatRupiah(total_discount)}</span>
                        </div>

                        <div className="mt-2 flex justify-between text-base font-semibold">
                            <span>Total:</span>
                            <span>{formatRupiah(total_price)}</span>
                        </div>
                    </div>

                    <div className="my-4 border-b border-dashed border-zinc-400" />

                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Pay:</span>
                            <span>{formatRupiah(pay)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Change:</span>
                            <span>{formatRupiah(change)}</span>
                        </div>
                    </div>

                    <div className="my-4 border-b border-dashed border-zinc-400" />

                    <p className="text-center text-xs text-zinc-600">
                        Thank You For Coming!
                    </p>

                    <Link
                        href="/cashier/pos"
                        className="mt-4 flex w-full items-center justify-center rounded bg-primary py-2 text-sm text-white"
                    >
                        Back
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
