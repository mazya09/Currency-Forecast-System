import React from "react";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

interface DatePickerInputProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null, dateString: string | string[]) => void; // string | string[]
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      allowClear
      format="DD.MM.YYYY"
      inputReadOnly={false}
      placeholder="Выберите дату или введите вручную"
    />
  );
};

export default DatePickerInput;
