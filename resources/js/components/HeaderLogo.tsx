import { Link } from '@inertiajs/react';
import { SiIfood } from 'react-icons/si';

export default function HeaderLogo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-3 rounded-lg transition"
        >
            <div className="text-3xl text-white">
                <SiIfood />
            </div>
            <div className="md:hidden">
                <h1 className="text-lg font-semibold">D'Katsu</h1>
                <p className="text-sm text-gray-600">Point Of Sale App</p>
            </div>
        </Link>
    );
}
