import MobileHeader from '@/components/partials/MobileHeader';
import Navbar from '@/components/partials/Navbar';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { OrderProvider } from '@/contexts/OrderContext';
import React from 'react';

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <Navbar />
                <MobileHeader />
                <NotificationProvider>
                    <OrderProvider>
                        <main className="p-3 pb-24 md:p-4 md:pb-4 md:pl-26 lg:pl-32">
                            {children}
                        </main>
                    </OrderProvider>
                </NotificationProvider>
            </div>
        </>
    );
}
