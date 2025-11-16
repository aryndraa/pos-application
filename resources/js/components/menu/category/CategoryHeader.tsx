import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CategoryForm from './CategoryForm';

export default function CategoryHeader() {
    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <h2 className="font-medium">All Categories</h2>
                <button
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer rounded-full bg-secondary p-2 text-sm"
                >
                    <FaPlus />
                </button>
            </div>
            {isOpen && <CategoryForm setIsOpen={() => setIsOpen(false)} />}
        </div>
    );
}
