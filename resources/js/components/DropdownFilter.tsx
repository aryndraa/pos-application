import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export default function DropdownFilter() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="lg:relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-full cursor-pointer items-center gap-3 rounded-lg bg-white p-4 py-3 text-sm font-medium text-nowrap md:text-base lg:py-4"
            >
                <span className="hidden md:block"> All Items</span>
                <FaChevronDown />
            </button>
            <div
                className={`fixed right-0 bottom-0 left-0 z-[99999] flex-col items-start rounded-lg bg-white p-4 pb-32 shadow lg:absolute lg:bottom-auto lg:mt-2 lg:w-64 lg:pb-4 ${
                    isOpen ? 'flex' : 'hidden'
                }`}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mb-4 flex w-full items-center justify-end gap-2 font-semibold text-gray-500 lg:hidden"
                >
                    Close <MdClose className="text-lg" />
                </button>
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-primary px-4 py-3 text-start font-medium text-white">
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
