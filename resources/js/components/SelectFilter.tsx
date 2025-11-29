import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Search from './Search';

interface SelectFilterProps {
    items: any[];
    onChange: (selectedItems: string[]) => void;
}

export default function SelectFilter({ items, onChange }: SelectFilterProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string | null) => {
        setSelected(value);
        onChange(value);
        setOpen(false);
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="w-full md:relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium"
            >
                <span className="truncate">{selected ?? 'All Items'}</span>
                <FaChevronDown
                    className={`transition ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 left-0 z-50 m-4 mt-2 rounded-lg border bg-white p-4 shadow-lg md:m-0 md:w-full">
                    <Search value={search} onChange={setSearch} delay={200} />

                    <ul className="mt-3 max-h-60 overflow-y-auto">
                        {/* ALL ITEMS */}
                        <li>
                            <button
                                className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100 ${
                                    selected === null
                                        ? 'bg-zinc-200 font-semibold'
                                        : ''
                                }`}
                                onClick={() => handleSelect(null)}
                            >
                                All Items
                            </button>
                        </li>

                        {/* LIST ITEM */}
                        {filteredItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100 ${
                                        selected === item.name
                                            ? 'bg-zinc-200 font-semibold'
                                            : ''
                                    }`}
                                    onClick={() => handleSelect(item.name)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
