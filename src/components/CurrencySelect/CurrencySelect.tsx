import React from "react";
import { Select } from "antd";

interface CurrencySelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const data = [
    { code: "USD", name: "United States Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "GBP", name: "British Pound Sterling", symbol: "£" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "KGS", name: "Kyrgyzstani Som", symbol: "сом" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
  ];
const options = data.map((c) => ({
  label: `${c.symbol} - ${c.name}`,
  value: c.code,
}));

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
  return (
    <Select
      style={{ width: 240 }}
      allowClear
      placeholder="Select currency"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
