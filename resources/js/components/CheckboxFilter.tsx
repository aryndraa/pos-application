import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Search from './Search';

interface CheckboxFilterProps {
    items: any[];
    onChange: (selectedItems: string[]) => void;
}

export default function CheckboxFilter({
    items,
    onChange,
}: CheckboxFilterProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<string[]>([]);

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

    const toggleItem = (name: string) => {
        const newSelected = selected.includes(name)
            ? selected.filter((i) => i !== name)
            : [...selected, name];

        setSelected(newSelected);
        onChange(newSelected); // kirim array ke parent
    };

    const filteredMenu = items!.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
    );

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
                    <Search value={search} onChange={setSearch} delay={300} />

                    <ul className="mt-4">
                        {filteredMenu!.map((item, index) => (
                            <li key={index}>
                                <label className="inline-flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-zinc-100">
                                    <input
                                        type="checkbox"
                                        className="size-4 rounded border-gray-300 shadow-sm"
                                        onChange={() => toggleItem(item.name)}
                                        checked={selected.includes(item.name)}
                                    />
                                    <span>{item.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
