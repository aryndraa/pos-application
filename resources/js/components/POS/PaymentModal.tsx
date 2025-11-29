import { formatRupiah } from '@/utils/formatRupiah';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

interface PaymentModalProps {
    closeModal: () => void;
    totalAmount: number;
}

export default function PaymentModal({
    closeModal,
    totalAmount,
}: PaymentModalProps) {
    const paymentMethods = ['cash', 'transfer', 'qris'];
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [open, setOpen] = useState(false);
    const [cashReceived, setCashReceived] = useState<number>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Hapus semua karakter kecuali angka
        const value = e.target.value.replace(/\D/g, '');
        setCashReceived(Number(value));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const change =
        cashReceived - totalAmount > 0 ? cashReceived - totalAmount : 0;

    return (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/10">
            <div className="w-[90%] rounded-lg border bg-white p-4 shadow-lg md:w-[70%] md:p-5 lg:w-[40%]">
                <div className="mb-6 flex items-center justify-between border-b pb-6">
                    <h1 className="text-xl font-semibold">Payment</h1>
                    <button
                        className="cursor-pointer rounded-lg border bg-zinc-200 p-2"
                        onClick={closeModal}
                    >
                        <MdClose />
                    </button>
                </div>

                <div className="mb-6 flex w-full justify-between rounded-lg text-xl font-medium">
                    <h3 className="font-medium">Total :</h3>
                    <p>{formatRupiah(totalAmount)}</p>
                </div>

                {/* Payment Method Dropdown */}
                <div className="relative mb-6 w-full" ref={dropdownRef}>
                    <h3 className="mb-2 text-sm font-medium text-zinc-500">
                        Payment Method
                    </h3>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium"
                    >
                        <span className="truncate capitalize">
                            {paymentMethod}
                        </span>
                        <FaChevronDown
                            className={`transition ${open ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {open && (
                        <div className="absolute right-0 left-0 z-50 mt-2 w-full rounded-lg border bg-white p-2 shadow-lg">
                            <ul className="flex flex-col">
                                {paymentMethods.map((method) => (
                                    <li key={method}>
                                        <button
                                            className={`w-full rounded-lg px-3 py-2 text-left text-sm capitalize hover:bg-zinc-100 ${
                                                paymentMethod === method
                                                    ? 'bg-zinc-200 font-semibold'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setPaymentMethod(method);
                                                setOpen(false);
                                                if (method !== 'cash')
                                                    setCashReceived(0);
                                            }}
                                        >
                                            {method}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {paymentMethod === 'cash' && (
                    <div className="mb-6">
                        <h3 className="mb-2 text-sm font-medium text-zinc-500">
                            Pay
                        </h3>
                        <input
                            type="text"
                            value={
                                cashReceived ? formatRupiah(cashReceived) : ''
                            }
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 text-sm font-medium outline-none"
                            placeholder="Input Money"
                        />

                        {cashReceived >= totalAmount && (
                            <p className="mt-2 text-sm font-medium">
                                Kembalian: {formatRupiah(change)}
                            </p>
                        )}
                    </div>
                )}

                <button
                    className="w-full rounded-lg bg-primary p-3 font-semibold text-white"
                    onClick={() => {
                        console.log({
                            paymentMethod,
                            cashReceived,
                            change,
                        });
                        closeModal();
                    }}
                >
                    Pay
                </button>
            </div>
        </div>
    );
}
