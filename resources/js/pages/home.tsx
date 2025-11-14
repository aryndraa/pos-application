import Header from '@/components/dashboard/Header';
import WdigetOverview from '@/components/dashboard/WidgetOverview';
import LowStockMenu from '@/components/LowStockMenu';
import OrderList from '@/components/OrderList';
import PopularMenu from '@/components/PopularMenu';
import AppLayout from '@/layouts/AppLayout';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

interface PopularMenuType {
    name: string;
    total_sold: number;
}

interface LowStockMenuType {
    name: string;
    stock: number;
}

interface HomeProps extends PageProps {
    totalEarnings: number;
    orderInQueue: number;
    waitingPayments: number;
    popularMenu: PopularMenuType[];
    lowStockMenu: LowStockMenuType[];
}

export default function Home() {
    const {
        totalEarnings,
        orderInQueue,
        waitingPayments,
        popularMenu,
        lowStockMenu,
    } = usePage<HomeProps>().props;

    console.log({ lowStockMenu });

    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-full lg:col-span-8">
                    <div className="mb-4 space-y-4">
                        <Header />
                        <WdigetOverview
                            totalEarnings={totalEarnings}
                            orderInQueue={orderInQueue}
                            waitingPayments={waitingPayments}
                        />
                    </div>
                    <div className="col-span-full grid gap-4 md:grid-cols-2">
                        <PopularMenu popularMenu={popularMenu} />
                        <LowStockMenu lowStockMenu={lowStockMenu} />
                    </div>
                </div>
                <div className="col-span-full lg:col-span-4">
                    <OrderList />
                </div>
            </section>
        </AppLayout>
    );
}
