import React from "react";
import { Input, Tooltip } from "antd";

interface NumericInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

export const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  placeholder = "Input a number",
  maxLength = 16,
}) => {
  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    placeholder
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  return (
    <Tooltip trigger={["focus"]} title={title} placement="topLeft" className="numeric-input">
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </Tooltip>
  );
};
