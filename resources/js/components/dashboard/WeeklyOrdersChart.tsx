import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface WeeklyOrderType {
    date: string;
    total: number;
}

interface WeeklyOrdersChartProps {
    data: WeeklyOrderType[];
}

export default function WeeklyOrdersChart({ data }: WeeklyOrdersChartProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
        });
    };

    return (
        <div className="w-full rounded-lg bg-white p-4">
            <h3 className="mb-8 border-b border-gray-300 pb-4 text-lg font-semibold text-dark-300">
                Weekly Orders
            </h3>

            <div className="h-40 w-full md:h-64 lg:h-72">
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
                            stroke="#f60000"
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
