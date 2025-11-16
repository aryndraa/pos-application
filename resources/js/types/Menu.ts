export interface Category {
    id: number;
    name: string;
    file_url: string;
}

export interface MenuType {
    id: number;
    name: string;
    stock: number;
    price: number;
    orders_count: number;
    category: Category;
}

export type MenuList = MenuType[];
