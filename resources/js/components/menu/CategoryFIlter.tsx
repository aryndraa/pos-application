import { Category } from '@/types/Menu';
import { router, usePage } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CategoryFilterProps {
    categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
    const { url } = usePage();
    const query = new URLSearchParams(url.split('?')[1] ?? '');
    const currentCategory = query.get('category');
    const currentFilter = query.get('filter');

    const handleFilter = (id: number | 'all') => {
        const params: any = {};

        if (id !== 'all') params.category = id;
        if (currentFilter) params.filter = currentFilter;

        router.get('/menu', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const isActive = (name: string | 'all') => {
        if (name === 'all') return currentCategory === null;
        return currentCategory === name;
    };

    return (
        <div className="sticky top-4 w-full rounded-lg bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium">All Categories</h2>
                <button className="rounded-full bg-secondary p-2 text-sm">
                    <FaPlus />
                </button>
            </div>

            {/* MOBILE */}
            <div className="lg:hidden">
                <Swiper spaceBetween={12} slidesPerView={2.8}>
                    <SwiperSlide>
                        <button
                            onClick={() => handleFilter('all')}
                            className={`flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive('all') ? 'border-2 border-secondary bg-secondary/10' : 'border-2 border-transparent bg-gray-100'} `}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740"
                                className="size-8 rounded-full object-cover"
                            />
                            All Menu
                        </button>
                    </SwiperSlide>

                    {categories.map((cat, index: number) => (
                        <SwiperSlide key={index}>
                            <button
                                onClick={() => handleFilter(cat.name)}
                                className={`flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive(cat.name) ? 'border-2 border-secondary bg-secondary/10' : 'border-2 border-transparent bg-gray-100'} `}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740"
                                    className="size-8 rounded-full object-cover"
                                />
                                {cat.name}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <ul className="scroll-y hidden max-h-[82vh] overflow-y-scroll pr-4 lg:flex lg:flex-col lg:gap-3">
                <li>
                    <button
                        onClick={() => handleFilter('all')}
                        className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium ${isActive('all') ? 'border-2 border-secondary bg-secondary/10' : 'border-2 border-transparent bg-gray-100'} `}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740"
                            className="size-12 rounded-full object-cover"
                        />
                        All Menu
                    </button>
                </li>

                {categories.map((cat) => (
                    <li key={cat.id}>
                        <button
                            onClick={() => handleFilter(cat.name)}
                            className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium ${isActive(cat.name) ? 'border-2 border-secondary bg-secondary/10' : 'border-2 border-transparent bg-gray-100'} `}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740"
                                className="size-12 rounded-full object-cover"
                            />
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
