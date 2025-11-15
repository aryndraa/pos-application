import { MdOutlineSearch } from 'react-icons/md';

interface SearchProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function Search({
    value,
    onChange,
    placeholder = 'Search...',
    className = '',
}: SearchProps) {
    return (
        <div
            className={`flex w-full items-center gap-4 rounded-lg bg-white p-4 py-3 lg:py-4 ${className}`}
        >
            <MdOutlineSearch className="text-2xl text-gray-500" />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full text-sm outline-none placeholder:text-gray-400 md:text-base"
            />
        </div>
    );
}
