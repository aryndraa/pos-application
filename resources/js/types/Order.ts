import Order from '@/actions/App/Http/Controllers/Order';

export interface Order {
    id: number;
    code: string;
    customer_name: string;
    order_date: string;
    total_price: number;
    payment_method: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    items: OrderItem[];
}

export interface Menu {
    id: number;
    name: string;
}

export interface AdditionalItem {
    id: number;
    name: string;
}

export interface OrderItemAdditional {
    id: number;
    quantity: number;
    unit_price: number;
    additional_item: AdditionalItem;
}

export interface OrderItem {
    id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    notes: string;
    menu: Menu;
    additionals: OrderItemAdditional[];
}

export type OrderList = Order[];
