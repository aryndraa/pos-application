import { useOrder } from '@/contexts/OrderContext';
import { Voucher } from '@/types/Voucher';
import { formatRupiah } from '@/utils/formatRupiah';
import { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdClose, MdOutlineShoppingCart } from 'react-icons/md';
import PaymentModal from './PaymentModal';

export default function CartItems({ voucher }: { voucher: Voucher[] }) {
    const { incrementOrder, decrementOrder, orders, total, clearOrders } =
        useOrder();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [customerName, setCustomerName] = useState<string>('');

    const calculateAdditionalTotal = (additionals: any) => {
        let total = 0;

        Object.values(additionals).forEach((group: any) => {
            if (!group) return;

            // Checkbox multiple → array
            if (Array.isArray(group)) {
                group.forEach((item) => {
                    total +=
                        (item.additional_price ?? 0) * (item.quantity ?? 1);
                });
                return;
            }

            if (typeof group === 'object') {
                if (Array.isArray(group.items)) {
                    group.items.forEach((item) => {
                        total +=
                            (item.additional_price ?? 0) * (item.quantity ?? 1);
                    });
                } else {
                    total +=
                        (group.additional_price ?? 0) * (group.quantity ?? 1);
                }
            }
        });

        return total;
    };

    const transformOrdersToItems = (orders: any[]) => {
        return orders.map((order) => {
            const additionals: Array<{
                additional_item_id: number;
                quantity: number;
                unit_price: number;
            }> = [];

            Object.values(order.additionals).forEach((group: any) => {
                if (!group) return;

                if (Array.isArray(group)) {
                    group.forEach((item) => {
                        additionals.push({
                            additional_item_id: item.id,
                            quantity: item.quantity || 1,
                            unit_price: item.additional_price,
                        });
                    });
                } else if (group.items && Array.isArray(group.items)) {
                    group.items.forEach((item: any) => {
                        additionals.push({
                            additional_item_id: item.id,
                            quantity: item.quantity || 1,
                            unit_price: item.additional_price,
                        });
                    });
                } else {
                    additionals.push({
                        additional_item_id: group.id,
                        quantity: group.quantity || 1,
                        unit_price: group.additional_price,
                    });
                }
            });

            const additionalTotal = calculateAdditionalTotal(order.additionals);

            return {
                menu_id: order.menu_id,
                quantity: order.quantity,
                unit_price: order.unit_price,
                subtotal: order.unit_price * order.quantity + additionalTotal,
                notes: order.notes,
                additionals,
            };
        });
    };

    const items = transformOrdersToItems(orders);

    const calculateGrandTotal = () => {
        return orders.reduce((acc, order) => {
            const additionalTotal = calculateAdditionalTotal(order.additionals);
            const subtotal =
                (order.unit_price + additionalTotal) * order.quantity;
            return acc + subtotal;
        }, 0);
    };

    return (
        <>
            {orders.length > 0 && (
                <button
                    onClick={() => setOpenCart(true)}
                    className="fixed right-0 bottom-18 left-0 m-4 flex items-center justify-between rounded-lg bg-primary p-4 py-3 text-white md:bottom-0 md:left-24 lg:hidden"
                >
                    <span className="rounded-lg border border-zinc-300 p-2">
                        <MdOutlineShoppingCart />
                    </span>
                    {orders.length} Items
                </button>
            )}

            <div
                className={`fixed top-0 right-0 left-0 z-50 h-screen flex-col justify-between rounded-lg border border-zinc-300 bg-white p-4 lg:sticky lg:top-4 lg:right-auto lg:left-auto lg:z-auto lg:h-[95vh] ${
                    openCart ? 'flex' : 'hidden lg:flex'
                }`}
            >
                <div>
                    <div className="mb-4 flex items-center justify-between border-b pb-6">
                        <h1 className="text-xl font-semibold"> Order List</h1>
                        <button
                            className="cursor-pointer rounded-lg border bg-zinc-200 p-2 lg:hidden"
                            onClick={() => setOpenCart(false)}
                        >
                            <MdClose />
                        </button>
                    </div>

                    <div className="border-b border-zinc-300 pb-4">
                        <div className="flex w-full items-center gap-3 rounded-lg border border-zinc-300 bg-white px-3 py-2.5">
                            <FaRegUserCircle className="text-xl text-gray-500" />
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                placeholder="Customer Name"
                                className="w-full text-sm capitalize outline-none placeholder:text-gray-400 md:text-base"
                            />
                        </div>
                    </div>

                    <div className="scroll-y max-h-[63vh] overflow-y-auto pt-4">
                        <ul className="flex flex-col gap-4">
                            {orders.length === 0 && (
                                <li className="pt-4 text-center text-sm text-gray-500">
                                    Belum ada pesanan
                                </li>
                            )}

                            {orders.map((order, index) => {
                                const additionalTotal =
                                    calculateAdditionalTotal(order.additionals);
                                const finalSubtotal =
                                    (order.unit_price + additionalTotal) *
                                    order.quantity;

                                return (
                                    <li
                                        key={index}
                                        className="flex flex-col items-start justify-between gap-2 rounded-lg border border-zinc-300 p-4 hover:bg-gray-50"
                                    >
                                        <div className="mb-4 flex w-full flex-col justify-between gap-4 md:mb-0 md:flex-row">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src="https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
                                                    alt=""
                                                    className="size-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-medium">
                                                        {order.name}
                                                    </h4>
                                                    <p className="text-sm text-primary">
                                                        {formatRupiah(
                                                            order.unit_price,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* QTY */}
                                            <div className="flex h-fit items-center justify-between gap-3 rounded-lg border px-2 py-2">
                                                <button
                                                    type="button"
                                                    className="flex size-5 items-center justify-center rounded border bg-zinc-200 font-medium"
                                                    onClick={() =>
                                                        decrementOrder(order.id)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span className="w-8 text-center text-sm font-semibold">
                                                    {order.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="flex size-5 items-center justify-center rounded border bg-primary font-medium text-white"
                                                    onClick={() =>
                                                        incrementOrder(order.id)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* ADDITIONALS */}
                                        <ul className="w-full space-y-2 border-t pt-2">
                                            {Object.keys(order.additionals).map(
                                                (groupName) => {
                                                    const group =
                                                        order.additionals[
                                                            groupName
                                                        ];
                                                    if (!group) return null;

                                                    // Multiple choice
                                                    if (Array.isArray(group)) {
                                                        return group.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="w-full"
                                                                >
                                                                    <div className="flex w-full justify-between text-sm">
                                                                        <h3 className="font-medium">
                                                                            {
                                                                                item.name
                                                                            }{' '}
                                                                            :
                                                                        </h3>
                                                                        <p>
                                                                            {formatRupiah(
                                                                                item.additional_price,
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            ),
                                                        );
                                                    }

                                                    // Single or grouped items
                                                    if (
                                                        typeof group ===
                                                        'object'
                                                    ) {
                                                        let totalPrice = 0;

                                                        if (
                                                            Array.isArray(
                                                                group.items,
                                                            )
                                                        ) {
                                                            totalPrice =
                                                                group.items.reduce(
                                                                    (acc, i) =>
                                                                        acc +
                                                                        (i.additional_price ??
                                                                            0) *
                                                                            (i.quantity ??
                                                                                1),
                                                                    0,
                                                                );
                                                        } else {
                                                            totalPrice =
                                                                (group.additional_price ??
                                                                    0) *
                                                                (group.quantity ??
                                                                    1);
                                                        }

                                                        return (
                                                            <li
                                                                key={groupName}
                                                                className="w-full"
                                                            >
                                                                <div className="flex w-full justify-between text-sm">
                                                                    <h3 className="font-medium">
                                                                        {
                                                                            group.name
                                                                        }{' '}
                                                                        :
                                                                    </h3>
                                                                    <p>
                                                                        {formatRupiah(
                                                                            totalPrice,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        );
                                                    }

                                                    return null;
                                                },
                                            )}
                                        </ul>

                                        {/* NOTES */}
                                        {order.notes && (
                                            <div className="w-full border-t border-zinc-300 pt-2">
                                                <h3 className="mb-1 text-sm font-medium">
                                                    Note :
                                                </h3>
                                                <p className="text-sm text-zinc-500">
                                                    {order.notes}
                                                </p>
                                            </div>
                                        )}

                                        {/* FINAL TOTAL PER MENU */}
                                        <div className="flex w-full justify-between border-t border-zinc-300 pt-2 font-medium">
                                            <h3>Total :</h3>
                                            <p>{formatRupiah(finalSubtotal)}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {orders.length > 0 && (
                    <div>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="mt-4 w-full rounded-lg bg-primary p-3 text-sm font-medium text-white"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            {openModal && (
                <PaymentModal
                    availableVouchers={voucher}
                    totalAmount={calculateGrandTotal()}
                    customer_name={customerName}
                    items={items}
                    closeModal={() => setOpenModal(false)}
                    clearOrders={() => clearOrders()}
                    clearName={() => setCustomerName('')}
                />
            )}
        </>
    );
}
