import MobileHeader from '@/components/partials/MobileHeader';
import Navbar from '@/components/partials/Navbar';
import { OverlayProvider } from '@/contexts/OverlayContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <OverlayProvider>
                    <Navbar />
                    <MobileHeader />
                    <main className="p-3 pb-24 md:p-4 md:pb-4 md:pl-26 lg:pl-32">
                        {children}
                    </main>
                </OverlayProvider>
            </div>
        </>
    );
}
