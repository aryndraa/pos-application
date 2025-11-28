import LowStockMenu from '@/components/dashboard/LowStockMenu';
import MenuDataTable from '@/components/menu/MenuDataTable';
import AppLayout from '@/layouts/AppLayout';
import { Category, MenuItem } from '@/types/Menu';
import { PaginatedData } from '@/types/Pagination';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

interface LowStockMenuType {
    name: string;
    stock: number;
}

interface MenuProps extends PageProps {
    menu: PaginatedData<MenuItem>;
    categories: Category[];
    lowStockMenu: LowStockMenuType[];
}

export default function Menu() {
    const { menu, categories, lowStockMenu } = usePage<MenuProps>().props;

    return (
        <AppLayout>
            <section className="flex flex-col gap-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-full lg:col-span-8">
                        <MenuDataTable menu={menu} categories={categories} />
                    </div>
                    <div className="col-span-full h-fit lg:col-span-4">
                        <LowStockMenu page="menu" lowStockMenu={lowStockMenu} />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
