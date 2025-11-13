import { FaMoneyBillWave } from 'react-icons/fa';

export default function WidgetCard() {
    return (
        <div className="flex flex-col justify-between rounded-lg bg-white p-4 md:gap-4">
            <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-neutral-400 md:text-base">
                    Total Earning
                </h3>
                <div className="rounded-lg bg-primary p-2 text-lg text-white lg:text-2xl">
                    <FaMoneyBillWave />
                </div>
            </div>
            <div>
                <span className="text-2xl font-medium md:text-3xl md:font-semibold">
                    $526
                </span>
            </div>
        </div>
    );
}
