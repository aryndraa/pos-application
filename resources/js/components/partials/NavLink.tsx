import { Link, usePage } from '@inertiajs/react';
import { MdSpaceDashboard } from 'react-icons/md';

export default function NavLink({
    href = '#',
    icon: Icon = MdSpaceDashboard,
    label = 'Dashboard',
}) {
    const { url } = usePage();

    const isActive = url === href;

    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 rounded-lg p-2.5 transition-colors md:p-3 lg:p-2 ${
                isActive ? 'bg-primary text-white' : 'text-neutral-500'
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
