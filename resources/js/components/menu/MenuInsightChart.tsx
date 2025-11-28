import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface MenuOrderType {
    date: string;
    total: number;
}

interface MenuInsightChartProps {
    data: MenuOrderType[];
    totalOrders: number;
}

export default function MenuInsightChart({
    data,
    totalOrders,
}: MenuInsightChartProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
        });
    };

    return (
        <div className="w-full rounded-lg border border-zinc-300 bg-white p-4 md:p-5">
            <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold text-dark-300">
                    Insight Overview
                </h3>
                <h4 className="text-lg font-semibold">
                    Total Order: {totalOrders}x
                </h4>
            </div>

            <div className="h-40 w-full md:h-64 lg:h-72 2xl:h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                        <Tooltip
                            labelFormatter={(d) => formatDate(d as string)}
                            formatter={(value) => [`${value} Orders`, 'Total']}
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#09090b"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
