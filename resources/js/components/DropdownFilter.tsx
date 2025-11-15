import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function DropdownFilter() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-4 font-medium"
            >
                All Items
                <FaChevronDown />
            </button>
            <div
                className={`absolute mt-2 w-64 flex-col items-start rounded-lg bg-white p-4 ${
                    isOpen ? 'flex' : 'hidden'
                }`}
            >
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-200 px-4 py-3 text-start font-medium">
                    All Items
                </button>
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-start font-medium text-gray-500 hover:bg-gray-100">
                    Out of stock
                    <span className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm">
                        12
                    </span>
                </button>
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-start font-medium text-gray-500 hover:bg-gray-100">
                    Available Items
                    <span className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm">
                        12
                    </span>
                </button>
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-start font-medium text-gray-500 hover:bg-gray-100">
                    Unavailable Items
                    <span className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-sm">
                        12
                    </span>
                </button>
            </div>
        </div>
    );
}
