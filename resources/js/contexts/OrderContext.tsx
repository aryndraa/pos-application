import { MenuItem } from '@/pages/POS';
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
    id: string; // Tambahkan id unik
    menu_id: number;
    name: string;
    unit_price: number;
    additional_total: number;
    quantity: number;
    subtotal: number;
    notes: string;
    additionals: Record<string, AdditionalGroup>;
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
    incrementOrder: (id: string) => void; // Ubah ke id
    decrementOrder: (id: string) => void; // Ubah ke id
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
});

// Fungsi untuk generate ID unik
const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    const calculateAdditionalPrice = (additionals: Record<string, any>) => {
        if (!additionals) return 0;

        let total = 0;

        Object.values(additionals).forEach((item: any) => {
            if (!item) return;

            const qty = item.quantity ?? 1;
            const price = item.additional_price ?? 0;

            total += price * qty;
        });

        return total;
    };

    const generateOrderKey = (
        menu_id: number,
        additionals: Record<string, any>,
    ) => {
        return `${menu_id}-${JSON.stringify(additionals)}`;
    };

    const addOrder = (
        menu: MenuItem,
        qty: number,
        additionals: Record<string, any> = {},
        notes: string = '',
    ) => {
        const additionalPrice = calculateAdditionalPrice(additionals);
        const orderKey = generateOrderKey(menu.id, additionals);

        setOrders((prev) => {
            const existing = prev.find(
                (order) =>
                    generateOrderKey(order.menu_id, order.additionals) ===
                    orderKey,
            );

            if (existing) {
                // jika menu + tambahan sama, gabungkan quantity
                return prev.map((order) =>
                    generateOrderKey(order.menu_id, order.additionals) ===
                    orderKey
                        ? {
                              ...order,
                              quantity: order.quantity + qty,
                              subtotal:
                                  (order.quantity + qty) *
                                  (order.unit_price + order.additional_total),
                          }
                        : order,
                );
            }

            const newOrder: OrderItem = {
                id: generateUniqueId(), // Gunakan fungsi generateUniqueId
                menu_id: menu.id,
                name: menu.name,
                unit_price: menu.price ?? 0,
                additional_total: additionalPrice ?? 0,
                quantity: Math.min(qty || 1, menu.stock ?? Infinity),
                notes,
                additionals,
                subtotal:
                    Math.min(qty || 1, menu.stock ?? 1) *
                    (menu.price + additionalPrice),
            };

            return [...prev, newOrder];
        });
    };

    const removeOrder = (menu_id: number) => {
        setOrders((prev) => prev.filter((order) => order.menu_id !== menu_id));
    };

    const clearOrders = () => setOrders([]);

    const incrementOrder = (id: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id
                    ? {
                          ...order,
                          quantity: (order.quantity || 0) + 1,
                          subtotal:
                              ((order.quantity || 0) + 1) *
                              ((order.unit_price || 0) +
                                  (order.additional_total || 0)),
                      }
                    : order,
            ),
        );
    };

    const decrementOrder = (id: string) => {
        setOrders((prev) =>
            prev
                .map((order) =>
                    order.id === id
                        ? {
                              ...order,
                              quantity: (order.quantity || 1) - 1,
                              subtotal:
                                  ((order.quantity || 1) - 1) *
                                  ((order.unit_price || 0) +
                                      (order.additional_total || 0)),
                          }
                        : order,
                )
                .filter((order) => order.quantity > 0),
        );
    };

    useEffect(() => {
        const totalPrice = orders.reduce(
            (acc, order) => acc + order.subtotal,
            0,
        );

        setTotal(totalPrice);
    }, [orders]);

    useEffect(() => {
        console.log('ORDERS UPDATED:', orders);
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
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => useContext(OrderContext);
