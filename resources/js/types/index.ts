export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
    permissions: string[];
}

export interface Auth {
    user: User | null;
}

export interface PageProps {
    auth: Auth;
    flash: {
        success?: string;
        error?: string;
    };
}

export type Role = 'cashier' | 'kitchen' | 'admin';

export type Permission =
    | 'view-menu'
    | 'view-pos'
    | 'create-order'
    | 'view-order'
    | 'view-bill'
    | 'view-history'
    | 'view-kitchen-display'
    | 'view-kitchen-orders'
    | 'update-order-status';
