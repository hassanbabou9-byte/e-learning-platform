import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from "recharts";

function StatisticsChart({ stats }) {

    const data = [
        {
            name: "Students",
            value: stats.students
        },
        {
            name: "Courses",
            value: stats.courses
        },
        {
            name: "Enrollments",
            value: stats.enrollments
        }
    ];

    const COLORS = [
        "#3b82f6",
        "#22c55e",
        "#a855f7"
    ];

    return (

        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 shadow-xl">

            <div className="mb-6">

                <h2 className="text-2xl font-bold">
                    Platform Analytics
                </h2>

                <p className="text-slate-400 mt-1">
                    Overview of platform statistics
                </p>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 0
                    }}
                >

                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        stroke="#94a3b8"
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #334155",
                            borderRadius: "12px",
                            color: "#ffffff"
                        }}
                    />

                    <Bar
                        dataKey="value"
                        radius={[12, 12, 0, 0]}
                    >
                        {
                            data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))
                        }
                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default StatisticsChart;