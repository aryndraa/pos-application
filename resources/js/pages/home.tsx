import DashboardWidget from '@/components/DashboardWidget';
import LowStockMenu from '@/components/LowStockMenu';
import OrderList from '@/components/OrderList';
import PopularMenu from '@/components/PopularMenu';
import AppLayout from '@/layouts/AppLayout';

export default function Home() {
    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-full lg:col-span-8">
                    <div className="mb-4">
                        <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-4">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Welcome Back, User!
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Check your customer orders.
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-2xl font-semibold">
                                    22:49:02
                                </span>
                                <span className="text-sm text-gray-600">
                                    Nov 12 2025
                                </span>
                            </div>
                        </div>
                        <DashboardWidget />
                    </div>
                    <div className="col-span-full grid grid-cols-2 gap-4">
                        <PopularMenu />
                        <LowStockMenu />
                    </div>
                </div>
                <div className="col-span-4">
                    <OrderList />
                </div>
            </section>
        </AppLayout>
    );
}
