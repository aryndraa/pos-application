export interface Category {
    id: number;
    name: string;
    file_url: string;
}

export interface MenuItem {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    is_available: boolean;
    category: string;
    file_url: string | null;
}

export type MenuList = MenuItem[];
