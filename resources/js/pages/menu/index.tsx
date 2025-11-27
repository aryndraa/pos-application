import LowStockMenu from '@/components/dashboard/LowStockMenu';
import MenuDataTable from '@/components/menu/MenuDataTable';
import AppLayout from '@/layouts/AppLayout';
import { Category, MenuType } from '@/types/Menu';
import { PageProps } from '@inertiajs/core';

interface MenuProps extends PageProps {
    menu: MenuType[];
    categories: Category[];
}

export default function Menu() {
    // const { menu, categories } = usePage<MenuProps>().props;

    return (
        <AppLayout>
            <section className="flex flex-col gap-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-full lg:col-span-8">
                        <MenuDataTable />
                    </div>
                    <div className="col-span-full lg:col-span-4">
                        <LowStockMenu page="menu" />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
