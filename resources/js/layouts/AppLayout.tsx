import Navbar from '@/components/partials/Navbar';
import { OverlayProvider } from '@/contexts/OverlayContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <OverlayProvider>
                    <Navbar />
                    <main className="min-h-screen bg-gray-100 pt-8">
                        {children}
                    </main>
                </OverlayProvider>
            </div>
        </>
    );
}
