import Menu from '@/components/menu/Menu';
import AppLayout from '@/layouts/AppLayout';

export default function menu() {
    return (
        <AppLayout>
            <section className="flex flex-col gap-4">
                <div>
                    <h1 className="rounded-lg bg-white p-4 py-3 text-lg font-medium md:py-4 md:text-2xl">
                        Menu Management
                    </h1>
                </div>
                {/* <PopularMenu /> */}

                <Menu />
            </section>
        </AppLayout>
    );
}
