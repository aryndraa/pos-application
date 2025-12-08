import { MenuItem } from '@/pages/pos';
import { createContext, useContext, useEffect, useState } from 'react';

interface AdditionalItem {
    id: number;
    name: string;
    additional_price: number;
    quantity: number;
}

interface AdditionalGroup {
    name: string;
    type: string;
    is_required: boolean;
    items: AdditionalItem[];
}

interface OrderItem {
    id: string;
    menu_id: number;
    name: string;
    unit_price: number;
    additional_total: number;
    quantity: number;
    subtotal: number;
    notes: string;
    additionals: Record<string, AdditionalGroup>;
}

interface CompletedOrder {
    code: string;
    customer_name: string;
    order_date: string;
    items: Array<any>;
    total: number;
    total_price: number;
    pay: number;
    change: number;
    payment_method: string;
}

interface OrderContextType {
    orders: OrderItem[];
    addOrder: (
        menu: MenuItem,
        qty: number,
        additionals: any,
        notes?: string,
    ) => void;
    removeOrder: (menu_id: number) => void;
    clearOrders: () => void;
    incrementOrder: (id: string) => void;
    decrementOrder: (id: string) => void;
    completedOrder: CompletedOrder | null;
    setCompletedOrder: (orderData: CompletedOrder) => void;
    total: number;
}

const OrderContext = createContext<OrderContextType>({
    orders: [],
    addOrder: () => {},
    removeOrder: () => {},
    clearOrders: () => {},
    incrementOrder: () => {},
    decrementOrder: () => {},
    total: 0,
    completedOrder: null,
    setCompletedOrder: () => {},
});

const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const calculateAdditionalTotal = (additionals: Record<string, any>) => {
    let total = 0;

    Object.values(additionals).forEach((group: any) => {
        if (!group?.items) return;

        group.items.forEach((item: any) => {
            total += (item.additional_price ?? 0) * (item.quantity ?? 1);
        });
    });

    return total;
};

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(
        null,
    );

    const generateOrderKey = (
        menu_id: number,
        additionals: Record<string, any>,
    ) => `${menu_id}-${JSON.stringify(additionals)}`;

    const addOrder = (
        menu: MenuItem,
        qty: number,
        additionals: Record<string, any> = {},
        notes: string = '',
    ) => {
        const additionalTotal = calculateAdditionalTotal(additionals);
        const orderKey = generateOrderKey(menu.id, additionals);

        setOrders((prev) => {
            const existing = prev.find(
                (order) =>
                    generateOrderKey(order.menu_id, order.additionals) ===
                    orderKey,
            );

            if (existing) {
                const newQty = existing.quantity + qty;
                const newSubtotal =
                    newQty * existing.unit_price + additionalTotal;

                return prev.map((order) =>
                    order.id === existing.id
                        ? {
                              ...order,
                              quantity: newQty,
                              additional_total: additionalTotal,
                              subtotal: newSubtotal,
                          }
                        : order,
                );
            }

            const newOrder: OrderItem = {
                id: generateUniqueId(),
                menu_id: menu.id,
                name: menu.name,
                unit_price: menu.price,
                additional_total: additionalTotal,
                quantity: qty,
                notes,
                additionals,
                subtotal: qty * menu.price + additionalTotal,
            };

            return [...prev, newOrder];
        });
    };

    const removeOrder = (menu_id: number) =>
        setOrders((prev) => prev.filter((o) => o.menu_id !== menu_id));

    const clearOrders = () => setOrders([]);
    const incrementOrder = (id: string) => {
        setOrders((prev) =>
            prev.map((order) => {
                if (order.id === id) {
                    const qty = order.quantity + 1;
                    const addTotal = calculateAdditionalTotal(
                        order.additionals,
                    );

                    return {
                        ...order,
                        quantity: qty,
                        subtotal: qty * order.unit_price + addTotal,
                    };
                }
                return order;
            }),
        );
    };

    const decrementOrder = (id: string) => {
        setOrders(
            (prev) =>
                prev
                    .map((order) => {
                        if (order.id === id) {
                            const qty = order.quantity - 1;
                            if (qty <= 0) return null;

                            const addTotal = calculateAdditionalTotal(
                                order.additionals,
                            );

                            return {
                                ...order,
                                quantity: qty,
                                subtotal: qty * order.unit_price + addTotal,
                            };
                        }
                        return order;
                    })
                    .filter(Boolean) as OrderItem[],
        );
    };

    useEffect(() => {
        setTotal(orders.reduce((acc, o) => acc + o.subtotal, 0));
    }, [orders]);

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                removeOrder,
                clearOrders,
                incrementOrder,
                decrementOrder,
                total,
                completedOrder,
                setCompletedOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => useContext(OrderContext);
