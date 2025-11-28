import { Category, MenuItem } from '@/types/Menu';
import { PaginatedData } from '@/types/Pagination';
import { formatRupiah } from '@/utils/formatRupiah';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import CheckboxFilter from '../CheckboxFilter';
import Pagination from '../Pagination';
import Search from '../Search';

interface MenuDataTableProps {
    menu: PaginatedData<MenuItem>;
    categories: Category[];
}

export default function MenuDataTable({
    menu,
    categories,
}: MenuDataTableProps) {
    const startNumber = (menu.current_page - 1) * menu.per_page;
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);

        const query = new URLSearchParams(window.location.search);

        if (value) query.set('search', value);
        else query.delete('search');

        router.get(
            '/menu?' + query.toString(),
            {},
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilter = (categories: string[]) => {
        const query = new URLSearchParams(window.location.search);

        if (categories.length > 0) {
            query.set('category', categories.join(','));
        } else {
            query.delete('category');
        }

        router.get(
            '/menu?' + query.toString(),
            {},
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="rounded-lg border border-zinc-300 bg-white p-4">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-xl font-semibold">List Products</h1>
                <div className="flex items-stretch gap-4">
                    <Search
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search menu..."
                        className="w-56"
                        delay={100}
                    />

                    <CheckboxFilter
                        items={categories}
                        onChange={handleFilter}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                No
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Image
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Name
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Category
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                SKU
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Price
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu && menu.data.length > 0 ? (
                            <>
                                {menu.data.map((item, index) => (
                                    <tr
                                        className="transition duration-300 hover:bg-zinc-100"
                                        key={index}
                                    >
                                        <td className="px-3 py-2">
                                            #{startNumber + index + 1}
                                        </td>
                                        <td className="px-3 py-2">
                                            <img
                                                src={
                                                    item.file_url ??
                                                    'https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg'
                                                }
                                                alt={item.name}
                                                className="aspect-square size-12 rounded-lg border border-zinc-300 object-cover"
                                            />
                                        </td>
                                        <td className="px-3 py-2">
                                            {item.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {item.category}
                                        </td>
                                        <td className="px-3 py-2">
                                            {item.sku}
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatRupiah(item.price)}
                                        </td>
                                        <td className="px-3 py-2">
                                            {item.stock}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr className="w-full">
                                <td
                                    colSpan={100}
                                    className="rounded-lg py-4 text-center text-sm text-gray-500"
                                >
                                    No Menu found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="mt-4 flex w-full justify-center border-t py-4">
                    <Pagination links={menu.links} />
                </div>
            </div>
        </div>
    );
}
