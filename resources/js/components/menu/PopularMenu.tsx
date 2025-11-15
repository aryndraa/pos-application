import PopularMenuCard from './PopularMenuCard';

export default function PopularMenu() {
    return (
        <div>
            <div className="mb-4">
                <h1 className="rounded-lg bg-white p-4 text-xl font-medium">
                    Popular Menu
                </h1>
            </div>
            <ul className="grid grid-cols-3 gap-4">
                <li>
                    <PopularMenuCard />
                </li>
                <li>
                    <PopularMenuCard />
                </li>
                <li>
                    <PopularMenuCard />
                </li>
            </ul>
        </div>
    );
}
