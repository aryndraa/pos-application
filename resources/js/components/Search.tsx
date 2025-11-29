import { useEffect, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

interface SearchProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    delay?: number;
}

export default function Search({
    value = '',
    onChange,
    placeholder = 'Search...',
    className = '',
    delay = 500,
}: SearchProps) {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            onChange?.(internalValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [internalValue, delay, onChange]);

    return (
        <div
            className={`flex w-full items-center gap-3 rounded-lg border border-zinc-300 bg-white p-4 py-3 ${className}`}
        >
            <MdOutlineSearch className="text-2xl text-gray-500" />

            <input
                type="text"
                value={internalValue}
                onChange={(e) => setInternalValue(e.target.value)}
                placeholder={placeholder}
                className="w-full text-sm outline-none placeholder:text-gray-400 md:text-base"
            />
        </div>
    );
}
