import MenuAdditionalVariants from '@/components/menu/MenuAdditionalVariants';
import MenuInsightChart from '@/components/menu/MenuInsightChart';
import AppLayout from '@/layouts/AppLayout';
import { formatRupiah } from '@/utils/formatRupiah';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';

interface itemType {
    id: number;
    name: string;
    additional_price: number;
    stock: number;
}

interface additionalType {
    name: string;
    items: itemType[];
}

interface MenuOrderType {
    date: string;
    total: number;
}

interface ShowProps extends PageProps {
    id: number;
    name: string;
    category: string;
    sku: string;
    price: number;
    stock: number;
    is_available: boolean;
    recipe: string;
    image: string;
    additionals: additionalType[];
    order_history: MenuOrderType[];
    totalOrders: number;
}

export default function Show() {
    const {
        id,
        name,
        category,
        sku,
        price,
        stock,
        is_available,
        recipe,
        image,
        additionals,
        order_history,
        totalOrders,
    } = usePage<ShowProps>().props;

    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4 overflow-x-hidden">
                <div className="col-span-full flex flex-col gap-4 lg:col-span-6">
                    <div className="h-full rounded-lg border border-zinc-300 p-4">
                        <img
                            src="https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
                            alt=""
                            className="aspect-square h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="col-span-full flex flex-col gap-4 lg:col-span-6">
                    <div className="rounded-lg border border-zinc-300 p-4 lg:p-5">
                        <h1 className="text-lg font-semibold">Detail Menu</h1>
                        <div className="my-4 flex items-center justify-between border-y border-zinc-300 py-4 text-primary">
                            <h2 className="text-lg font-semibold capitalize md:text-2xl">
                                {name}
                            </h2>
                        </div>
                        <ul>
                            <li className="flex items-center justify-between border-b border-zinc-300 pb-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    SKU
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {sku}
                                </span>
                            </li>
                            <li className="flex items-center justify-between border-b border-zinc-300 py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Category
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {category}
                                </span>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <h3 className="text-sm font-medium text-zinc-600 md:text-base">
                                    Unit Price
                                </h3>
                                <span className="font-medium capitalize md:text-lg">
                                    {formatRupiah(price)}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex h-full flex-col justify-between gap-4 rounded-lg border border-zinc-300 p-4 lg:p-5">
                        <div>
                            <h1 className="mb-4 border-b border-zinc-300 pb-4 text-lg font-semibold">
                                Receipt
                            </h1>
                            <div>
                                <p className="text-zinc-500">{recipe}....</p>
                            </div>
                        </div>
                        <Link
                            href={`/cashier/menu/${id}/recipe`}
                            className="w-full cursor-pointer rounded-lg bg-primary p-2 text-center text-sm font-semibold text-white lg:p-3"
                        >
                            View More
                        </Link>
                    </div>
                </div>
                <div className="col-span-full">
                    <MenuAdditionalVariants additionals={additionals} />
                </div>
                <div className="col-span-full">
                    <MenuInsightChart
                        data={order_history}
                        totalOrders={totalOrders}
                    />
                </div>
            </section>
        </AppLayout>
    );
}
