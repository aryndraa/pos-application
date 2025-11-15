import MenuCard from '../MenuCard';

export default function ListMenu() {
    return (
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <li>
                <MenuCard />
            </li>
            <li>
                <MenuCard />
            </li>
            <li>
                <MenuCard />
            </li>
            <li>
                <MenuCard />
            </li>

            <li>
                <MenuCard />
            </li>
            <li>
                <MenuCard />
            </li>
            <li>
                <MenuCard />
            </li>
            <li>
                <MenuCard />
            </li>
        </ul>
    );
}
