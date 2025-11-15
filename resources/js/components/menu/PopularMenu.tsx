import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PopularMenuCard from './PopularMenuCard';

export default function PopularMenu() {
    return (
        <div>
            <div className="mb-4">
                <h1 className="rounded-lg bg-white p-4 text-lg font-medium md:text-xl">
                    Popular Menu
                </h1>
            </div>
            <ul className="hidden grid-cols-3 gap-4 md:grid">
                <li>
                    <PopularMenuCard />
                </li>
                <li>
                    <PopularMenuCard />
                </li>
                <li>
                    <PopularMenuCard />
                </li>
            </ul>
            <div className="block md:hidden">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={1.2}
                    centeredSlides={false}
                    className="rounded-lg"
                >
                    <SwiperSlide>
                        <PopularMenuCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <PopularMenuCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <PopularMenuCard />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
