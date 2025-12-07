import { Link } from '@inertiajs/react';
import { SiIfood } from 'react-icons/si';

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-3 rounded-lg transition"
        >
            <div className="rounded-lg bg-primary p-2 text-2xl text-white">
                <SiIfood />
            </div>
            <div className="md:hidden">
                <h1 className="text-lg font-semibold">Point Of Sale App</h1>
            </div>
        </Link>
    );
}
