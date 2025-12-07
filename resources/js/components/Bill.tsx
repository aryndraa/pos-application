import { formatRupiah } from '@/utils/formatRupiah';
import { useState } from 'react';
import { FaPrint } from 'react-icons/fa';

interface BillItem {
    id: number;
    menu: { name: string };
    quantity: number;
    unit_price: number;
    subtotal: number;
}

interface BillProps {
    code: string;
    customer_name: string;
    order_date: string;
    total_price: number;
    pay: number;
    change: number;
    items: BillItem[];
}

export default function Bill({
    code,
    customer_name,
    order_date,
    total_price,
    pay,
    change,
    items,
}: BillProps) {
    const [showBill, setShowBill] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowBill(true)}
                className="flex items-center gap-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white"
            >
                Check Bill
                <FaPrint />
            </button>

            {showBill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
                    <div className="w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="text-center">
                            <h2 className="mb-2 text-xl font-bold">POS APP</h2>
                            <p className="text-sm">Jl. Kebagusan No. 12</p>
                            <p className="text-sm">Telp: 0812-3456-7890</p>
                            <div className="my-3 border-b border-dashed border-zinc-400" />
                        </div>

                        <div className="text-sm">
                            <p>
                                <span className="font-semibold">Order:</span>{' '}
                                {code}
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

                        <button
                            onClick={() => setShowBill(false)}
                            className="mt-3 w-full rounded bg-primary py-2 text-sm text-white"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
