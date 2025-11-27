import MenuOverview from '@/components/menu/MenuOverview';
import AppLayout from '@/layouts/AppLayout';
import { Category, MenuType } from '@/types/Menu';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

interface MenuProps extends PageProps {
    menu: MenuType[];
    categories: Category[];
}

export default function Menu() {
    const { menu, categories } = usePage<MenuProps>().props;

    return (
        <AppLayout>
            <section className="flex flex-col gap-4">
                <div>
                    <h1 className="rounded-lg bg-white p-4 py-3 text-lg font-medium md:py-4 md:text-2xl">
                        Menu Management
                    </h1>
                </div>
                <MenuOverview menu={menu} categories={categories} />
            </section>
        </AppLayout>
    );
}
