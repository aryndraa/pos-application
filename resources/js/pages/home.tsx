import LowStockMenu from '@/components/LowStockMenu';
import PopularMenu from '@/components/PopularMenu';
import WidgetCard from '@/components/WidgetCard';
import AppLayout from '@/layouts/AppLayout';

export default function Home() {
    return (
        <AppLayout>
            <section className="grid grid-cols-12 px-4 md:px-8 lg:px-12 2xl:px-16">
                <div className="col-span-8">
                    <div className="col-span-full mb-4">
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
                        <div className="grid grid-cols-3 gap-4">
                            <WidgetCard />
                            <WidgetCard />
                            <WidgetCard />
                        </div>
                    </div>
                    <div className="col-span-full grid grid-cols-2 gap-4">
                        <PopularMenu />
                        <LowStockMenu />
                    </div>
                </div>
                <div className="col-span-4"></div>
            </section>
        </AppLayout>
    );
}
