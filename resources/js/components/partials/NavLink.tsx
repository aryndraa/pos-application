import { Link, usePage } from '@inertiajs/react';
import { MdSpaceDashboard } from 'react-icons/md';

export default function NavLink({
    href,
    icon: Icon = MdSpaceDashboard,
    label = 'Dashboard',
}) {
    const { url } = usePage(); // Dapatkan URL aktif dari Inertia

    const isActive = url === href; // cek apakah link ini aktif

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 rounded-full p-3 transition-colors lg:px-4 lg:py-1 ${
                isActive ? 'text-primary' : 'text-neutral-500'
            }`}
        >
            <span className="text-xl">
                <Icon />
            </span>
            <span className="hidden text-sm font-medium md:block">{label}</span>
        </Link>
    );
}
