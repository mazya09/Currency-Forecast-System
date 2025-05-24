import React from "react";
import { Select } from "antd";
import currencyList from "../../JSON/currencyList.json"
interface CurrencySelectProps {
  value?: string;
  onChange?: (value: string) => void;
}


const options = currencyList.map((c) => ({
  label: c.name,
  value: c.index,
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
