export default function WidgetCard({
    label,
    icon,
    value,
}: {
    label?: string;
    icon?: React.ReactNode;
    value?: string | number;
}) {
    return (
        <div className="flex flex-col justify-between rounded-lg bg-white p-4">
            <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-neutral-400 md:text-base">
                    {label || 'Total Earnings'}
                </h3>
                <div className="rounded-lg bg-primary p-2 text-lg text-white lg:text-2xl">
                    {icon || '$'}
                </div>
            </div>
            <div>
                <span className="text-2xl font-medium md:font-semibold">
                    {value || '150,000'}
                </span>
            </div>
        </div>
    );
}
