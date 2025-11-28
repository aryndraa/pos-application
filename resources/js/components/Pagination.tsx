import { Link } from '@inertiajs/react';

export default function Pagination({ links }: any) {
    return (
        <div className="mt-4 flex gap-2">
            {links.map((link: any, i: number) => (
                <Link
                    key={i}
                    href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded border px-3 py-1 ${link.active ? 'bg-primary text-white' : 'bg-white'} ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                />
            ))}
        </div>
    );
}
