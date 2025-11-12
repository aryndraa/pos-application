import Navbar from '@/components/partials/Navbar';
import { OverlayProvider } from '@/contexts/OverlayContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <OverlayProvider>
                    <Navbar />
                    <main className="min-h-screen bg-dark-200">{children}</main>
                </OverlayProvider>
            </div>
        </>
    );
}
