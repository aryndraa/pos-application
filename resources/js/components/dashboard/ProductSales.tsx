import { Link } from '@inertiajs/react';

interface PopularMenuType {
    name: string;
    total_sold: number;
}

interface PopularMenuProps {
    productSales?: PopularMenuType[];
}

export default function ProductSales({ productSales }: PopularMenuProps) {
    let numbering = 1;

    return (
        <div className="rounded-lg border border-zinc-300 bg-white p-4">
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Menu sales</h3>
                <Link className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
                    View More
                </Link>
            </div>
            <ul className="space-y-2">
                {productSales && productSales.length > 0 ? (
                    productSales.map((menu, index: number) => (
                        <li
                            key={index}
                            className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 transition hover:bg-gray-100 md:gap-5"
                        >
                            <span className="text-xl font-semibold">
                                {numbering++}
                            </span>
                            <div className="flex items-center gap-4 md:gap-5">
                                <img
                                    src="https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
                                    alt=""
                                    className="size-10 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-medium">{menu.name}</h4>
                                    <p className="text-xs md:text-sm">
                                        Orders : <span>{menu.total_sold}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <>
                        {productSales!.length === 0 && (
                            <li className="rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-500">
                                No orders found.
                            </li>
                        )}
                    </>
                )}
            </ul>
        </div>
    );
}
