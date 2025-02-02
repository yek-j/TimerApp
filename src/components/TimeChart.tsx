import { ChartProps } from "@/types/time";
import { formatTime } from "@/utils/timer";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function TimeChart({data, period}: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={period === 'yearly' ? 'month' : period === 'monthly' ? 'date' : 'day'} />
                <YAxis />
                <Tooltip formatter={(value: number) => formatTime(value)} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="minutes"
                    name="시간"
                    stroke="#8884d8"
                    dot={period === 'yearly'}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}