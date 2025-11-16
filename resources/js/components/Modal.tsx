import React from 'react';
import { MdClose } from 'react-icons/md';
import Overlay from './Overlay';

interface ModalProps {
    children: React.ReactNode;
    title: string;
    toggle: () => void;
}

export default function Modal({ children, title, toggle }: ModalProps) {
    return (
        <Overlay>
            <div className="m-4 w-full rounded-lg bg-white p-5 md:w-[60%] lg:m-0 lg:w-[35%]">
                <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4 text-gray-500">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <button
                        onClick={toggle}
                        className="cursor-pointer rounded-full bg-primary p-1 text-white"
                    >
                        <MdClose />
                    </button>
                </div>
                {children}
            </div>
        </Overlay>
    );
}
