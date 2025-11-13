import Navbar from '@/components/partials/Navbar';
import { OverlayProvider } from '@/contexts/OverlayContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <OverlayProvider>
                    <Navbar />
                    <main className="p-8 pl-24">{children}</main>
                </OverlayProvider>
            </div>
        </>
    );
}
