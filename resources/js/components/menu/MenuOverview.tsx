import { Category, MenuType } from '@/types/Menu';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import DropdownFilter from '../DropdownFilter';
import Search from '../Search';
import CategoryFIlter from './category/CategoryFIlter';
import ListMenu from './ListMenu';

interface MenuOverviewProps {
    menu: MenuType[];
    categories: Category[];
}

export default function MenuOverview({ menu, categories }: MenuOverviewProps) {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filterOptions = [
        { label: 'All Items', key: 'all' },
        { label: 'Popular Menu', key: 'popular' },
        { label: 'Out of Stock', key: 'lowstock' },
        { label: 'Available Items', key: 'available' },
        { label: 'Unavailable Items', key: 'unavailable' },
    ];

    const { url } = usePage();
    const query = new URLSearchParams(url.split('?')[1] ?? '');
    const currentCategory = query.get('category');

    function handleFilterChange(key: string) {
        setFilter(key);

        const params: any = {};

        if (key !== 'all') params.filter = key;
        if (currentCategory) params.category = currentCategory;

        router.get('/menu', params, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const filteredMenu = menu.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div>
            <div className="gap-4 lg:grid lg:grid-cols-12">
                <div className="mb-4 lg:col-span-2 lg:mb-0">
                    <CategoryFIlter categories={categories} />
                </div>

                <div className="lg:col-span-10">
                    <div className="mb-4 flex flex-col items-center justify-between gap-4 lg:flex-row">
                        <div className="flex w-full items-stretch gap-2 lg:w-fit lg:gap-4">
                            <div className="w-full lg:w-96">
                                <Search
                                    value={search}
                                    onChange={setSearch}
                                    placeholder="Search menu..."
                                />
                            </div>

                            <DropdownFilter
                                options={filterOptions}
                                activeKey={filter}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="w-full lg:w-fit">
                            <Link
                                href="menu/create"
                                className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-lg bg-secondary px-4 py-3 font-semibold lg:w-fit"
                            >
                                New Menu
                                <FaPlus />
                            </Link>
                        </div>
                    </div>

                    <ListMenu menu={filteredMenu} />
                </div>
            </div>
        </div>
    );
}
