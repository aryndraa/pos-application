import { Link, usePage } from '@inertiajs/react';
import { MdSpaceDashboard } from 'react-icons/md';

export default function NavLink({
    href,
    icon: Icon = MdSpaceDashboard,
    label = 'Dashboard',
}) {
    const { url } = usePage();

    const isActive = url === href;

    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 rounded-lg px-2 py-3 transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-neutral-500'
            }`}
        >
            <span className="text-2xl">
                <Icon />
            </span>
            <span className="hidden text-[10px] font-medium md:block">
                {label}
            </span>
        </Link>
    );
}
