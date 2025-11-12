import { FaMoneyBillWave } from 'react-icons/fa';

export default function WidgetCard() {
    return (
        <div className="flex flex-col justify-between gap-4 rounded-lg bg-white p-4">
            <div className="flex items-start justify-between">
                <h3 className="font-medium text-neutral-400">Total Earning</h3>
                <div className="rounded-lg bg-primary p-2 text-2xl text-white">
                    <FaMoneyBillWave />
                </div>
            </div>
            <div>
                <span className="text-3xl font-semibold">$526</span>
            </div>
        </div>
    );
}
