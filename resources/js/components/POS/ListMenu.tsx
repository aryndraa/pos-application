import MenuCard from './MenuCard';

interface itemType {
    id: number;
    name: string;
    additional_price: number;
    stock: number;
}

interface additionalType {
    name: string;
    type: string; // single. mutiple, counting
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
    file_url?: string;
    additionals: additionalType[];
}

interface GroupedMenu {
    name: string;
    items: MenuItem[];
}

interface ListMenuProps {
    menu: GroupedMenu[];
}

export default function ListMenu({ menu }: ListMenuProps) {
    return (
        <ul>
            {menu && menu.length > 0 ? (
                <>
                    {menu.map((item, index) => (
                        <li
                            key={index}
                            className="mb-12 border-b border-zinc-300 pb-12 last:border-none last:pb-0"
                        >
                            <h2 className="mb-6 text-xl font-semibold">
                                {item.name}
                            </h2>
                            {item.items.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {item.items.map((menu, index) => (
                                        <MenuCard
                                            additionals={menu.additionals}
                                            key={index}
                                            id={menu.id}
                                            name={menu.name}
                                            price={menu.price}
                                            file_url={menu.file_url}
                                        />
                                    ))}
                                </div>
                            ) : (
                                ''
                            )}
                        </li>
                    ))}
                </>
            ) : (
                <li className="rounded-lg bg-gray-100 py-3 text-center text-sm text-gray-500">
                    No menu found.
                </li>
            )}
        </ul>
    );
}
