import { Link, usePage } from '@inertiajs/react';
import { MdSpaceDashboard } from 'react-icons/md';

export default function NavLink({
    href = '#',
    icon: Icon = MdSpaceDashboard,
    label = 'Dashboard',
}) {
    const { url } = usePage();

    const cleanUrl = url.split('?')[0];
    const cleanHref = href.split('?')[0];

    const isActive =
        cleanUrl === cleanHref ||
        (cleanHref !== '/cashier' && cleanUrl.startsWith(cleanHref + '/'));

    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 rounded-lg border p-2.5 transition-colors md:p-3 lg:p-2 ${
                isActive
                    ? 'border-zinc-600 bg-zinc-900 text-white'
                    : 'border-transparent text-zinc-400'
            }`}
        >
            <span className="text-xl md:text-2xl">
                <Icon />
            </span>
            <span className="hidden text-[10px] font-medium lg:block">
                {label}
            </span>
        </Link>
    );
}
