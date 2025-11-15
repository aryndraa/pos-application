import { formatRupiah } from '@/utils/formatRupiah';
import { FaMoneyBillWave, FaRegListAlt } from 'react-icons/fa';
import { MdRoomService } from 'react-icons/md';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import WidgetCard from '../WidgetCard';

interface WidgetOverviewProps {
    totalEarnings?: number;
    orderInQueue?: number;
    waitingPayments?: number;
}

export default function WdigetOverview({
    totalEarnings,
    orderInQueue,
    waitingPayments,
}: WidgetOverviewProps) {
    return (
        <div>
            <div className="hidden grid-cols-3 gap-4 md:grid">
                <WidgetCard
                    icon={<FaMoneyBillWave />}
                    label="Total Earnings"
                    value={formatRupiah(totalEarnings!)}
                />
                <WidgetCard
                    icon={<MdRoomService />}
                    label="Orders in Queue"
                    value={orderInQueue! + ' Orders'}
                />
                <WidgetCard
                    icon={<FaRegListAlt />}
                    label="Waiting Payments"
                    value={waitingPayments}
                />
            </div>

            <div className="block md:hidden">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={1.8}
                    centeredSlides={false}
                    className="rounded-lg"
                >
                    <SwiperSlide>
                        <WidgetCard
                            icon={<FaMoneyBillWave />}
                            label="Total Earnings"
                            value={formatRupiah(totalEarnings!)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WidgetCard
                            icon={<MdRoomService />}
                            label="Orders in Queue"
                            value={orderInQueue! + ' Orders'}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WidgetCard
                            icon={<FaRegListAlt />}
                            label="Waiting Payments"
                            value={waitingPayments}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
