import { useOrder } from '@/contexts/OrderContext';
import { formatRupiah } from '@/utils/formatRupiah';
import { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdClose, MdOutlineShoppingCart } from 'react-icons/md';
import PaymentModal from './PaymentModal';

export default function CartItems() {
    const { incrementOrder, decrementOrder, orders, total } = useOrder();
    console.log(orders);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [openCart, setOpenCart] = useState<boolean>(false);

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
                className={`fixed top-0 right-0 left-0 z-50 h-screen flex-col justify-between rounded-lg border border-zinc-300 bg-white p-4 lg:sticky lg:top-4 lg:right-auto lg:left-auto lg:z-auto lg:h-[95vh] ${openCart ? 'flex' : 'hidden lg:flex'}`}
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

                            {orders.map((order, index) => (
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
                                    <ul className="w-full space-y-2 border-t pt-2">
                                        {Object.keys(order.additionals).map(
                                            (groupName) => {
                                                const group =
                                                    order.additionals[
                                                        groupName
                                                    ];
                                                if (!group) return null;

                                                // Jika group adalah array (checkbox multiple)
                                                if (Array.isArray(group)) {
                                                    return group.map((item) => (
                                                        <li
                                                            key={item.id}
                                                            className="w-full"
                                                        >
                                                            <div className="flex w-full justify-between text-sm">
                                                                <h3 className="font-medium">
                                                                    {item.name}{' '}
                                                                    :
                                                                </h3>
                                                                <p>
                                                                    {formatRupiah(
                                                                        item.additional_price,
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ));
                                                }

                                                // Jika group adalah object tunggal (single)
                                                if (typeof group === 'object') {
                                                    // Bisa pakai reduce jika group.items array
                                                    const total =
                                                        group.items?.reduce(
                                                            (acc, i) =>
                                                                acc +
                                                                (i.additional_price ??
                                                                    0) *
                                                                    (i.quantity ??
                                                                        1),
                                                            0,
                                                        ) ??
                                                        group.additional_price ??
                                                        0;

                                                    return (
                                                        <li
                                                            key={groupName}
                                                            className="w-full"
                                                        >
                                                            <div className="flex w-full justify-between text-sm">
                                                                <h3 className="font-medium">
                                                                    {group.name}{' '}
                                                                    :
                                                                </h3>
                                                                <p>
                                                                    {formatRupiah(
                                                                        total,
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

                                    <div className="flex w-full justify-between border-t border-zinc-300 pt-2 font-medium">
                                        <h3>Total : </h3>
                                        <p>{formatRupiah(order.subtotal)}</p>
                                    </div>
                                </li>
                            ))}
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
                    totalAmount={total}
                    closeModal={() => setOpenModal(false)}
                />
            )}
        </>
    );
}
