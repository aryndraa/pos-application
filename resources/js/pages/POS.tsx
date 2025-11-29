import CartItems from '@/components/POS/CartItems';
import ListMenu from '@/components/POS/ListMenu';
import Search from '@/components/Search';
import SelectFilter from '@/components/SelectFilter';
import AppLayout from '@/layouts/AppLayout';
import { Category } from '@/types/Menu';
import { usePage } from '@inertiajs/react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';
import { useState } from 'react';

interface itemType {
    id: number;
    name: string;
    additional_price: number;
    stock: number;
}

interface additionalType {
    name: string;
    type: string;
    is_required: boolean;
    items: itemType[];
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
    additionals: additionalType[];
}

interface GroupedMenu {
    name: string;
    items: MenuItem[];
}

interface POSProps extends PageProps {
    categories: Category[];
    menu: GroupedMenu[];
}

export default function POS() {
    const { categories, menu } = usePage<POSProps>().props;
    const [selectCategory, setSelectCategory] = useState<string>('all');
    const [search, setSearch] = useState<string>('');

    const filteredMenu = (menu ?? [])
        .map((group: GroupedMenu) => {
            const activeCategory = selectCategory
                ? selectCategory.toLowerCase()
                : 'all';

            const filteredItems = group.items.filter((item: MenuItem) => {
                const itemName = item.name.toLowerCase();
                const categoryName = item.category.toLowerCase();

                const matchesCategory =
                    activeCategory === 'all' || categoryName === activeCategory;

                const matchesSearch = itemName.includes(search.toLowerCase());

                return matchesCategory && matchesSearch;
            });

            return {
                name: group.name,
                items: filteredItems,
            };
        })
        .filter((group) => group.items.length > 0);

    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-full lg:col-span-8">
                    <div className="rounded-lg border border-zinc-300 p-4 md:p-5">
                        <h1 className="mb-6 border-b border-zinc-300 pb-6 text-xl font-semibold">
                            Select Menu
                        </h1>
                        <div className="mb-6 grid grid-cols-12 gap-4 border-b border-zinc-300 pb-6">
                            <div className="order-2 col-span-full md:order-1 md:col-span-4">
                                <SelectFilter
                                    items={categories}
                                    onChange={(value: any) =>
                                        setSelectCategory(value)
                                    }
                                />
                            </div>
                            <div className="order-1 col-span-full md:order-2 md:col-span-8">
                                <Search value={search} onChange={setSearch} />
                            </div>
                        </div>

                        <ListMenu menu={filteredMenu} />
                    </div>
                </div>
                <div className="col-span-4">
                    <CartItems />
                </div>
            </section>
        </AppLayout>
    );
}
