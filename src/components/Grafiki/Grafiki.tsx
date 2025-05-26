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
    date: string; // стартовая дата "YYYY-MM-DD"
    amount: number; // количество дней
    historicalRates: number[];
    predictedRates: number[];
  };
};

const generateChartData = (
  startDate: string,
  historicalRates: number[],
  predictedRates: number[]
) => {
  const chartData: {
    name: string;
    historical?: number;
    forecast?: number;
  }[] = [];

  const start = new Date(startDate);

  // Кол-во исторических дней берем из длины historicalRates
  const historicalDays = historicalRates.length;

  // Создаем даты для исторических значений
  for (let i = -historicalDays; i < 0; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const label = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });

    chartData.push({
      name: label,
      historical: historicalRates[historicalDays + i], // индексация для исторических значений
    });
  }

  // Добавляем даты для прогнозируемых значений
  for (let i = 0; i < predictedRates.length; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const label = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });

    chartData.push({
      name: label,
      forecast: predictedRates[i],
    });
  }

  return chartData;
};

const MyChart: React.FC<Props> = ({ data }) => {
  const chartData = useMemo(() => {
    return generateChartData(data.date, data.historicalRates, data.predictedRates);
  }, [data.date, data.historicalRates, data.predictedRates]);

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
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="historical"
          stroke="#8884d8"
          name="Historical Rates"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(MyChart);
