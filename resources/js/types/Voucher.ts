export interface Voucher {
    id: number;
    code: string;
    name: string;
    type: 'percentage' | 'fixed';
    discount: number;
    max_discount: number | null;
}
