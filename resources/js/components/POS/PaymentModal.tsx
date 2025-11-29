import { useNotification } from '@/contexts/NotificationContext';
import { formatRupiah } from '@/utils/formatRupiah';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

interface PaymentModalProps {
    closeModal: () => void;
    totalAmount: number;
    customer_name: string;
    items: Array<{
        menu_id: number;
        quantity: number;
        unit_price: number;
        subtotal: number;
        notes: string;
        additionals: Array<{
            additional_item_id: number;
            quantity: number;
            unit_price: number;
        }>;
    }>;
    clearOrders?: () => void;
    clearName?: () => void;
}

export default function PaymentModal({
    closeModal,
    totalAmount,
    customer_name,
    items,
    clearOrders,
    clearName,
}: PaymentModalProps) {
    const paymentMethods = ['cash', 'transfer', 'qris'];
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [open, setOpen] = useState(false);
    const [cashReceived, setCashReceived] = useState<number>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(false);

    const { notify } = useNotification();

    const [orderData, setOrderData] = useState({
        customer_name: customer_name,
        payment_method: paymentMethod,
        pay: cashReceived,
        items: items,
    });

    console.log(orderData);

    useEffect(() => {
        setOrderData({
            customer_name: customer_name,
            payment_method: paymentMethod,
            pay: cashReceived,
            items: items,
        });
    }, [customer_name, paymentMethod, cashReceived, items]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const resetState = () => {
        setPaymentMethod('cash');
        setCashReceived(0);
        setOrderData({
            customer_name: '',
            payment_method: 'cash',
            pay: 0,
            items: [],
        });
    };

    const handleSubmit = () => {
        setLoading(true);

        router.post('/orders', orderData, {
            onSuccess: (page) => {
                const data = page.props.flash?.success || page.props.response;
                notify('success', data?.message || 'Order succesfully');

                resetState();

                if (clearOrders) {
                    clearOrders();
                    clearName();
                }

                closeModal();
            },
            onError: (errors) => {
                notify(
                    'error',
                    Object.values(errors).flat().join(', ') ||
                        'Failed to proccess payment.',
                );
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

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
                    className="w-full rounded-lg bg-primary p-3 font-semibold text-white disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={
                        loading ||
                        (paymentMethod === 'cash' && cashReceived < totalAmount)
                    }
                >
                    {loading ? 'Memproses...' : 'Pay'}
                </button>
            </div>
        </div>
    );
}
