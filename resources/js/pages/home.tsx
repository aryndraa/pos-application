import Header from '@/components/dashboard/Header';
import LowStockMenu from '@/components/dashboard/LowStockMenu';
import OrderList from '@/components/dashboard/OrderList';
import ProductSales from '@/components/dashboard/ProductSales';
import WeeklyOrdersChart from '@/components/dashboard/WeeklyOrdersChart';
import WdigetOverview from '@/components/dashboard/WidgetOverview';
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

interface OrderItemType {
    id: number;
    customer_name: string;
    status: string;
    order_date: string;
}

interface WeeklyOrderType {
    date: string;
    total: number;
}

interface HomeProps extends PageProps {
    totalEarnings: number;
    orderInQueue: number;
    waitingPayments: number;
    productSales: PopularMenuType[];
    unavailableMenu: LowStockMenuType[];
    inProgressOrders: OrderItemType[];
    waitingPaymentOrders: OrderItemType[];
    weeklyOrders: WeeklyOrderType[];
}

export default function Home() {
    const {
        totalEarnings,
        orderInQueue,
        waitingPayments,
        productSales,
        unavailableMenu,
        inProgressOrders,
        waitingPaymentOrders,
        weeklyOrders,
    } = usePage<HomeProps>().props;

    console.log({ unavailableMenu });

    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4 pb-6 lg:pb-0">
                <div className="col-span-full lg:col-span-8">
                    <div className="mb-4 space-y-4">
                        <Header />
                        <WdigetOverview
                            totalEarnings={totalEarnings}
                            orderInQueue={orderInQueue}
                            waitingPayments={waitingPayments}
                        />
                    </div>
                    <div className="col-span-full mb-4 grid gap-4 md:grid-cols-2">
                        <ProductSales productSales={productSales} />
                        <LowStockMenu lowStockMenu={unavailableMenu} />
                    </div>
                    <div className="col-span-full">
                        <WeeklyOrdersChart data={weeklyOrders} />
                    </div>
                </div>
                <div className="col-span-full h-fit lg:sticky lg:top-4 lg:col-span-4">
                    <OrderList
                        inProgressOrders={inProgressOrders}
                        waitingPaymentOrders={waitingPaymentOrders}
                    />
                </div>
            </section>
        </AppLayout>
    );
}
