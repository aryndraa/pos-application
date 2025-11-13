import Navbar from '@/components/partials/Navbar';
import { OverlayProvider } from '@/contexts/OverlayContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <OverlayProvider>
                    <Navbar />
                    <main className="p-4 pl-20">{children}</main>
                </OverlayProvider>
            </div>
        </>
    );
}
