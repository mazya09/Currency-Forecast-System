import React, { useState } from "react";
import { Space, Select, DatePicker, Input, Button } from "antd";
import type { Dayjs } from "dayjs";
import "./Forecast.scss";
import MyChart from "../../components/Grafiki/Grafiki.tsx";

const currencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
];

type ForecastData = {
  currency: string;
  date: string;
  endDate: string;
  amount: string;
};

export default function Forecast() {
  const [currency, setCurrency] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [amount, setAmount] = useState("");
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  const handleCurrencyChange = (value: string) => setCurrency(value);

  const handleDateChange = (date: Dayjs | null) => setDate(date);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // только цифры
    setAmount(value);
  };

  const sendToBackend = () => {
    if (!currency || !date || !amount) {
      alert("Выберите валюту, дату и количество дней");
      return;
    }

    const days = parseInt(amount);
    if (isNaN(days) || days <= 0 || days > 365) {
      alert("Введите количество дней от 1 до 365");
      return;
    }

    const formattedStartDate = date.format("DD.MM.YYYY");
    const endDate = date.add(days - 1, "day");
    const formattedEndDate = endDate.format("DD.MM.YYYY");

    const payload: ForecastData = {
      currency,
      date: formattedStartDate,
      endDate: formattedEndDate,
      amount,
    };

    console.log("Отправляем на бэк:", payload);
    setForecastData(payload);
  };

  return (
    <div className="content_w">
      <Space className="content_ch">
        <Select
          style={{ width: 250 }}
          placeholder="Currency"
          options={currencies.map((c) => ({
            label: c.name,
            value: c.code,
          }))}
          value={currency}
          onChange={handleCurrencyChange}
          allowClear
        />
        <DatePicker
          style={{ width: 250 }}
          onChange={handleDateChange}
          value={date}
          format="DD.MM.YYYY"
          placeholder="Start Date"
        />
        <Input
          type="number"
          min={1}
          max={365}
          placeholder="Forecast Days"
          value={amount}
          onChange={handleAmountChange}
          style={{ width: 250 }}
        />
        <Button type="primary" onClick={sendToBackend} style={{ width: 250 }}>
          Forecast
        </Button>
      </Space>

      {forecastData && (
        <>
          <div style={{ marginTop: 20 }}>
            Forecast for <b>{forecastData.currency}</b> from{" "}
            <b>{forecastData.date}</b> to <b>{forecastData.endDate}</b> for{" "}
            <b>{forecastData.amount}</b> days in KGS
          </div>
          <div style={{ width: "80%", height: 500 }}>
            <MyChart data={forecastData} />
          </div>
        </>
      )}
    </div>
  );
}
