import { MenuType } from '@/types/Menu';
import MenuCard from '../MenuCard';

interface ListMenuProps {
    menu: MenuType[];
}

export default function ListMenu({ menu }: ListMenuProps) {
    return (
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {menu.map((item, index: number) => (
                <li key={index}>
                    <MenuCard
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        orders_count={item.orders_count}
                        price={item.price}
                        stock={item.stock}
                    />
                </li>
            ))}
            {menu.length === 0 && (
                <li className="col-span-full w-full rounded-lg bg-gray-200 py-3 text-center text-gray-500">
                    Menu not found.
                </li>
            )}
        </ul>
    );
}
