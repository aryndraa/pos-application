import { FaPlus } from 'react-icons/fa';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function CategoryFilter() {
    const categories = [
        {
            name: 'Katsu',
            image: 'https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740',
        },
        {
            name: 'Sushi',
            image: 'https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740',
        },
        {
            name: 'Ramen',
            image: 'https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740',
        },
        {
            name: 'Ramen',
            image: 'https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740',
        },
        {
            name: 'Ramen',
            image: 'https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740',
        },
    ];

    return (
        <div className="w-full rounded-lg bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium">All Categories</h2>
                <button className="rounded-full bg-secondary p-2 text-sm">
                    <FaPlus />
                </button>
            </div>

            {/* MOBILE – TABLET: Swiper */}
            <div className="lg:hidden">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={2.8}
                    breakpoints={{
                        768: {
                            slidesPerView: 3.8,
                        },
                    }}
                >
                    <SwiperSlide>
                        <button className="flex w-full cursor-pointer flex-col items-center justify-start gap-3 rounded-lg border-2 border-secondary bg-gray-100 px-4 py-3 text-sm font-medium text-dark-300">
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740"
                                className="size-8 rounded-full object-cover"
                            />
                            All Menu
                        </button>
                    </SwiperSlide>

                    {categories.map((cat, i) => (
                        <SwiperSlide key={i}>
                            <button className="flex w-full cursor-pointer flex-col items-center justify-start gap-3 rounded-lg border-2 border-transparent bg-gray-100 px-4 py-3 text-sm font-medium text-dark-300">
                                <img
                                    src={cat.image}
                                    className="size-8 rounded-full object-cover"
                                />
                                {cat.name}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* DESKTOP: Flex Column */}
            <ul className="hidden lg:flex lg:flex-col lg:gap-3">
                {categories.map((cat, i) => (
                    <li key={i}>
                        <button
                            className={`flex w-full cursor-pointer flex-col items-center justify-start gap-2 rounded-lg border-2 ${
                                i === 0
                                    ? 'border-secondary'
                                    : 'border-transparent bg-gray-100'
                            } px-4 py-4 font-medium text-dark-300`}
                        >
                            <img
                                src={cat.image}
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
