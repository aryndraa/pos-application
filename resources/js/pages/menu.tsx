import DropdownFilter from '@/components/DropdownFilter';
import CategoryFIlter from '@/components/menu/CategoryFIlter';
import PopularMenu from '@/components/menu/PopularMenu';
import Search from '@/components/Search';
import AppLayout from '@/layouts/AppLayout';
import { FaPlus } from 'react-icons/fa';

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
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-2">
                            <CategoryFIlter />
                        </div>
                        <div className="col-span-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-stretch gap-4">
                                    <div className="w-96">
                                        <Search />
                                    </div>

                                    <DropdownFilter />
                                </div>

                                <div>
                                    <button className="flex cursor-pointer items-center gap-4 rounded-lg bg-secondary px-4 py-3 font-semibold">
                                        New Menu
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
