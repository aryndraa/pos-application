import PopularMenu from '@/components/menu/PopularMenu';
import AppLayout from '@/layouts/AppLayout';

export default function menu() {
    return (
        <AppLayout>
            <section className="flex flex-col gap-4">
                <PopularMenu />
                <div>
                    <div className="mb-4">
                        <h1 className="rounded-lg bg-white p-4 text-xl font-medium">
                            All Menu
                        </h1>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
