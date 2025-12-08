import { useNotification } from '@/contexts/NotificationContext';
import { Voucher } from '@/types/Voucher';
import { formatRupiah } from '@/utils/formatRupiah';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaPercentage, FaTicketAlt } from 'react-icons/fa';
import { MdClose, MdDining, MdShoppingBag } from 'react-icons/md';

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
    availableVouchers?: Voucher[];
    clearOrders?: () => void;
    clearName?: () => void;
}

export default function PaymentModal({
    closeModal,
    totalAmount,
    customer_name,
    items,
    availableVouchers = [],
    clearOrders,
    clearName,
}: PaymentModalProps) {
    const paymentMethods = ['cash', 'transfer', 'qris'];
    const serviceTypes = [
        { value: 'dine in', label: 'Dine In', icon: MdDining },
        { value: 'take away', label: 'Take Away', icon: MdShoppingBag },
    ];

    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [serviceType, setServiceType] = useState<string>('dine in');
    const [openPayment, setOpenPayment] = useState(false);
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [voucherCode, setVoucherCode] = useState<string>('');
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(
        null,
    );
    const [voucherError, setVoucherError] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const { notify } = useNotification();

    useEffect(() => {
        if (selectedVoucher) {
            let calculatedDiscount = 0;

            if (selectedVoucher.type === 'percentage') {
                calculatedDiscount =
                    (totalAmount * selectedVoucher.discount) / 100;

                if (
                    selectedVoucher.max_discount &&
                    calculatedDiscount > selectedVoucher.max_discount
                ) {
                    calculatedDiscount = selectedVoucher.max_discount;
                }
            } else if (selectedVoucher.type === 'fixed') {
                calculatedDiscount = selectedVoucher.discount;
            }

            if (calculatedDiscount > totalAmount) {
                calculatedDiscount = totalAmount;
            }

            setDiscount(calculatedDiscount);
        } else {
            setDiscount(0);
        }
    }, [selectedVoucher, totalAmount]);

    const finalTotal = totalAmount - discount;

    const [orderData, setOrderData] = useState({
        customer_name: customer_name,
        payment_method: paymentMethod,
        service_type: serviceType,
        voucher_code: voucherCode,
        pay: cashReceived,
        items: items,
    });

    useEffect(() => {
        setOrderData({
            customer_name: customer_name,
            payment_method: paymentMethod,
            service_type: serviceType,
            voucher_code: selectedVoucher?.code || '',
            pay: cashReceived,
            items: items,
        });
    }, [
        customer_name,
        paymentMethod,
        serviceType,
        selectedVoucher,
        cashReceived,
        items,
    ]);

    const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCashReceived(Number(value));
    };

    const handleVoucherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value;
        setVoucherCode(code);
        setVoucherError('');
    };

    const applyVoucher = () => {
        if (!voucherCode.trim()) {
            setVoucherError('Please enter a voucher code');
            return;
        }

        const voucher = availableVouchers.find(
            (v) => v.code === voucherCode.trim(),
        );

        if (!voucher) {
            setVoucherError('Invalid voucher code');
            setSelectedVoucher(null);
            return;
        }

        setSelectedVoucher(voucher);
        setVoucherError('');
        notify('success', 'Voucher applied successfully!');
    };

    const removeVoucher = () => {
        setSelectedVoucher(null);
        setVoucherCode('');
        setVoucherError('');
        setDiscount(0);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenPayment(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const change =
        cashReceived - finalTotal > 0 ? cashReceived - finalTotal : 0;

    const resetState = () => {
        setPaymentMethod('cash');
        setServiceType('dine_in');
        setCashReceived(0);
        setVoucherCode('');
        setSelectedVoucher(null);
        setDiscount(0);
        setVoucherError('');
        setOrderData({
            customer_name: '',
            payment_method: 'cash',
            service_type: 'dine_in',
            voucher_code: '',
            pay: 0,
            items: [],
        });
    };

    const handleSubmit = () => {
        setLoading(true);

        router.post('/cashier/orders', orderData, {
            onSuccess: (page) => {
                const data = page.props.flash?.success || page.props.response;
                notify(
                    'success',
                    data?.message || 'Order successfully created',
                );

                resetState();

                if (clearOrders) {
                    clearOrders();
                }
                if (clearName) {
                    clearName();
                }

                closeModal();
            },
            onError: (errors) => {
                notify(
                    'error',
                    Object.values(errors).flat().join(', ') ||
                        'Failed to process payment.',
                );
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/10 p-4">
            <div className="max-h-[90vh] w-full overflow-y-auto rounded-lg border bg-white p-4 shadow-lg md:w-[70%] md:p-6 lg:w-[50%] xl:w-[40%]">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b pb-4">
                    <h1 className="text-xl font-semibold">Payment</h1>
                    <button
                        className="cursor-pointer rounded-lg border bg-zinc-200 p-2 hover:bg-zinc-300"
                        onClick={closeModal}
                    >
                        <MdClose />
                    </button>
                </div>

                {/* Service Type Selection */}
                <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-zinc-700">
                        Service Type
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {serviceTypes.map((service) => {
                            const Icon = service.icon;
                            return (
                                <button
                                    key={service.value}
                                    onClick={() =>
                                        setServiceType(service.value)
                                    }
                                    className={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 transition ${
                                        serviceType === service.value
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-zinc-200 hover:border-zinc-300'
                                    }`}
                                >
                                    <Icon className="text-xl" />
                                    <span className="font-medium">
                                        {service.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Voucher Section */}
                <div className="mb-6 rounded-lg border border-dashed border-zinc-300 p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <FaTicketAlt className="text-primary" />
                        <h3 className="text-sm font-medium text-zinc-700">
                            Apply Voucher
                        </h3>
                    </div>

                    {!selectedVoucher ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={voucherCode}
                                onChange={handleVoucherInput}
                                placeholder="Enter voucher code"
                                className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                            <button
                                onClick={applyVoucher}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                Apply
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                            <div className="flex items-center gap-2">
                                <FaPercentage className="text-green-600" />
                                <div>
                                    <p className="text-sm font-semibold text-green-700">
                                        {selectedVoucher.code}
                                    </p>
                                    <p className="text-xs text-green-600">
                                        {selectedVoucher.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={removeVoucher}
                                className="rounded-lg p-1 hover:bg-green-100"
                            >
                                <MdClose className="text-green-700" />
                            </button>
                        </div>
                    )}

                    {voucherError && (
                        <p className="mt-2 text-xs text-red-500">
                            {voucherError}
                        </p>
                    )}
                </div>

                {/* Price Summary */}
                <div className="mb-6 space-y-2 rounded-lg bg-zinc-50 p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-600">Subtotal</span>
                        <span className="font-medium">
                            {formatRupiah(totalAmount)}
                        </span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-green-600">Discount</span>
                            <span className="font-medium text-green-600">
                                - {formatRupiah(discount)}
                            </span>
                        </div>
                    )}

                    <div className="border-t border-zinc-200 pt-2">
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span className="text-primary">
                                {formatRupiah(finalTotal)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="relative mb-6 w-full" ref={dropdownRef}>
                    <h3 className="mb-2 text-sm font-medium text-zinc-700">
                        Payment Method
                    </h3>
                    <button
                        onClick={() => setOpenPayment(!openPayment)}
                        className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium hover:bg-zinc-50"
                    >
                        <span className="truncate capitalize">
                            {paymentMethod}
                        </span>
                        <FaChevronDown
                            className={`transition ${openPayment ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {openPayment && (
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
                                                setOpenPayment(false);
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

                {/* Cash Payment Input */}
                {paymentMethod === 'cash' && (
                    <div className="mb-6">
                        <h3 className="mb-2 text-sm font-medium text-zinc-700">
                            Cash Received
                        </h3>
                        <input
                            type="text"
                            value={
                                cashReceived ? formatRupiah(cashReceived) : ''
                            }
                            onChange={handleCashChange}
                            className="w-full rounded-lg border px-4 py-3 text-sm font-medium outline-none focus:border-primary"
                            placeholder="Input cash amount"
                        />

                        {cashReceived >= finalTotal && cashReceived > 0 && (
                            <div className="mt-3 rounded-lg bg-green-50 p-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-700">
                                        Change
                                    </span>
                                    <span className="font-semibold text-green-700">
                                        {formatRupiah(change)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    className="w-full rounded-lg bg-primary p-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={
                        loading ||
                        (paymentMethod === 'cash' && cashReceived < finalTotal)
                    }
                >
                    {loading ? 'Processing...' : 'Complete Payment'}
                </button>
            </div>
        </div>
    );
}
