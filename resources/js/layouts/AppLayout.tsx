import Navbar from '@/components/partials/Navbar';
import { OverlayProvider } from '@/contexts/OverlayContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <OverlayProvider>
                    <Navbar />
                    <main className="p-4 lg:pl-32">{children}</main>
                </OverlayProvider>
            </div>
        </>
    );
}
