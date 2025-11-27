import { formatRupiah } from '@/utils/formatRupiah';
import { FaListAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdRoomService } from 'react-icons/md';
import 'swiper/css';
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
            <div className="grid grid-cols-2 gap-4 last:col-span-full md:grid-cols-3">
                <div className="col-span-2 md:col-span-1">
                    <WidgetCard
                        icon={<FaMoneyBillWave />}
                        label="Total Earnings"
                        value={formatRupiah(totalEarnings!)}
                    />
                </div>
                <WidgetCard
                    icon={<MdRoomService />}
                    label="Orders in Queue"
                    value={orderInQueue + ' Orders'}
                />
                <WidgetCard
                    icon={<FaListAlt />}
                    label="Waiting Payments"
                    value={waitingPayments + ' Orders'}
                />
            </div>
        </div>
    );
}
