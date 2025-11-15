import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export interface FilterOption {
    label: string;
    value?: number;
    key: string;
}

interface DropdownFilterProps {
    options: FilterOption[];
    activeKey: string;
    onChange: (key: string) => void;
}

export default function DropdownFilter({
    options,
    activeKey,
    onChange,
}: DropdownFilterProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const activeLabel =
        options.find((o) => o.key === activeKey)?.label ?? 'Filter';

    return (
        <div className="lg:relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-full cursor-pointer items-center gap-3 rounded-lg bg-white p-4 py-3 text-sm font-medium text-nowrap md:text-base lg:py-4"
            >
                <span className="hidden md:block">{activeLabel}</span>
                <FaChevronDown />
            </button>

            <div
                className={`fixed inset-x-0 bottom-0 z-[99999] flex-col items-start rounded-lg bg-white p-4 pb-32 shadow lg:absolute lg:bottom-auto lg:mt-2 lg:w-64 lg:pb-4 ${
                    isOpen ? 'flex' : 'hidden'
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="mb-4 flex w-full items-center justify-end gap-2 font-semibold text-gray-500 lg:hidden"
                >
                    Close <MdClose className="text-lg" />
                </button>

                {options.map((opt) => (
                    <button
                        key={opt.key}
                        onClick={() => {
                            onChange(opt.key);
                            setIsOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-start font-medium transition ${
                            activeKey === opt.key
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {opt.label}

                        {opt.value !== undefined && (
                            <span className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm text-dark-300">
                                {opt.value}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
