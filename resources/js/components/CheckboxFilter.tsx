import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Search from './Search';

export default function CheckboxFilter() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="lg:relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-full items-center justify-center gap-3 rounded-lg border border-primary bg-primary px-4 text-sm font-semibold text-white"
            >
                <FaFilter />
                Filter
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-3 w-64 rounded-lg border border-zinc-300 bg-white p-4 shadow-lg">
                    <Search />

                    <ul className="mt-4">
                        <li>
                            <label className="inline-flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-zinc-100">
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300 shadow-sm"
                                />
                                <span>Option 1</span>
                            </label>
                        </li>

                        <li>
                            <label className="inline-flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-zinc-100">
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300 shadow-sm"
                                />
                                <span>Option 2</span>
                            </label>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
