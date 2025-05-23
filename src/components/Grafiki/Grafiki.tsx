import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  data: {
    currency: string;
    date: string;
    amount: string;
  };
};

const generateChartData = (startDate: string, days: number) => {
  const chartData: {
    name: string;
    historical?: number;
    forecast?: number;
  }[] = [];

  const start = new Date(startDate.split(".").reverse().join("-"));

  for (let i = -5; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const label = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });

    chartData.push({
      name: label,
      historical: i < 0 ? 80 + i * 2 + Math.random() * 5 : undefined,
      forecast: i >= 0 ? 85 + i * 2 + Math.random() * 5 : undefined,
    });
  }

  return chartData;
};

const MyChart: React.FC<Props> = ({ data }) => {
    const chartData = useMemo(() => {
        return generateChartData(data.date, parseInt(data.amount));
      }, [data.date, data.amount]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit=" KGS" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#82ca9d"
          name="Forecasted Rates"
          strokeDasharray="5 5"
          strokeWidth={2}
          connectNulls={true}
        />
        <Line
          type="monotone"
          dataKey="historical"
          stroke="#8884d8"
          name="Historical Rates"
          strokeWidth={2}
          dot={false}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(MyChart);
