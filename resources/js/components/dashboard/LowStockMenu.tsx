import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

interface LowStockMenuType {
    name: string;
    file_url: string;
}

interface LowStockMenuProps {
    lowStockMenu?: LowStockMenuType[];
    page?: string;
}

export default function LowStockMenu({
    lowStockMenu,
    page = 'dashboard',
}: LowStockMenuProps) {
    const [more, setMore] = useState<boolean>(false);

    return (
        <div className="h-full rounded-lg border border-zinc-300 bg-white p-4">
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Not Available Menu</h3>
                {page === 'dashboard' && (
                    <Link className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
                        View More
                    </Link>
                )}
            </div>
            <ul className="mb-4 space-y-2">
                {lowStockMenu && lowStockMenu.length > 0 ? (
                    lowStockMenu.length > 8 && more ? (
                        <>
                            {lowStockMenu.map((menu, index: number) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 transition hover:bg-gray-100 md:gap-5"
                                >
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <img
                                            src={
                                                menu.file_url ??
                                                'https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg'
                                            }
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                {menu.name}
                                            </h4>
                                        </div>
                                    </div>
                                    <span className="rounded-full text-2xl text-primary">
                                        <MdErrorOutline />
                                    </span>
                                </li>
                            ))}
                        </>
                    ) : (
                        <>
                            {lowStockMenu
                                .slice(0, 8)
                                .map((menu, index: number) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between gap-4 rounded-lg px-4 py-2 transition hover:bg-gray-100 md:gap-5"
                                    >
                                        <div className="flex items-center gap-4 md:gap-5">
                                            <img
                                                src={
                                                    menu.file_url ??
                                                    'https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg'
                                                }
                                                alt=""
                                                className="size-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-medium">
                                                    {menu.name}
                                                </h4>
                                            </div>
                                        </div>
                                        <span className="rounded-full text-2xl text-primary">
                                            <MdErrorOutline />
                                        </span>
                                    </li>
                                ))}
                        </>
                    )
                ) : (
                    <li className="rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-500">
                        No menu found.
                    </li>
                )}
            </ul>
            {page === 'menu' && lowStockMenu!.length > 8 && (
                <button
                    onClick={() => setMore(!more)}
                    className="w-full rounded-lg bg-primary p-2 text-sm font-semibold text-white lg:p-3"
                >
                    {more ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
}
