import MenuTable from '@/components/menu/MenuTable';
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
                <div className="grid grid-cols-12">
                    <div className="col-span-8">
                        <MenuTable />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
