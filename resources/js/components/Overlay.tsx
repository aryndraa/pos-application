import React from 'react';
import { createPortal } from 'react-dom';

export default function Overlay({ children }: { children: React.ReactNode }) {
    return createPortal(
        <div className="fixed inset-0 z-[99990] flex min-h-screen items-center justify-center bg-black/30 lg:items-center">
            {children}
        </div>,
        document.body,
    );
}
