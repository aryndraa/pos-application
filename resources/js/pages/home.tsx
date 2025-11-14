import Header from '@/components/dashboard/Header';
import WdigetOverview from '@/components/dashboard/WidgetOverview';
import LowStockMenu from '@/components/LowStockMenu';
import OrderList from '@/components/OrderList';
import PopularMenu from '@/components/PopularMenu';
import AppLayout from '@/layouts/AppLayout';

export default function Home() {
    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-full lg:col-span-8">
                    <div className="mb-4 space-y-4">
                        <Header />
                        <WdigetOverview />
                    </div>
                    <div className="col-span-full grid gap-4 md:grid-cols-2">
                        <PopularMenu />
                        <LowStockMenu />
                    </div>
                </div>
                <div className="col-span-full lg:col-span-4">
                    <OrderList />
                </div>
            </section>
        </AppLayout>
    );
}
