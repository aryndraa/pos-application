import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import WidgetCard from '../WidgetCard';

export default function WdigetOverview() {
    return (
        <div>
            <div className="hidden grid-cols-3 gap-4 md:grid">
                <WidgetCard />
                <WidgetCard />
                <WidgetCard />
            </div>

            <div className="block md:hidden">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={1.8}
                    centeredSlides={false}
                    className="rounded-lg"
                >
                    <SwiperSlide>
                        <WidgetCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WidgetCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WidgetCard />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
