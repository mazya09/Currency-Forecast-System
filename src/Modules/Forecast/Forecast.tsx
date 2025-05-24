import React from "react";
import { observer } from "mobx-react-lite";
import { Select, DatePicker, Input, Button, notification } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "./Forecast.scss";
import MyChart from "../../components/Grafiki/Grafiki.tsx";
import { requestStore } from "../../Store/Forecasting.ts";
import MyTable from "../../components/Table/Table.tsx";
import currencyList from "../../JSON/currencyList.json";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";

const data = [
  { key: "1", name: "John", age: 32 },
  { key: "2", name: "Mary", age: 28 },
];

const cols = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
];

export default observer(function Forecast() {
  const CONTROL_STYLE: React.CSSProperties = {
    width: 250,
    textAlign: "center",
  };
  const {
    currency,
    startDate,
    days,
    result,
    isLoading,
    error,
    setCurrency,
    setStartDate,
    setDays,
    sendRequest,
  } = requestStore;

  React.useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка",
        description: error,
        placement: "topRight",
      });
      requestStore.error = null; // очищаем ошибку после показа
    }
  }, [error]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setStartDate(date.format("YYYY-MM-DD"));
    } else {
      setStartDate("");
    }
  };

  const handleForecast = () => {
    if (!currency || !startDate || !days) {
      notification.error({
        message: "Ошибка",
        description: "Заполните все поля",
        placement: "topRight",
      });
      return;
    }
    if (days <= 0 || days > 365) {
      notification.error({
        message: "Ошибка",
        description: "Дней должно быть от 1 до 365",
        placement: "topRight",
      });
      return;
    }
    sendRequest();
  };

  const parsedDate = startDate ? dayjs(startDate) : null;
  const endDate = parsedDate?.add(days - 1, "day").format("YYYY-MM-DD");

  return (
    <Blockwrapper>
      <h1>Currency Forecast</h1>
      <Blockchildren>
        <Select
          style={CONTROL_STYLE}
          placeholder="Currency"
          options={currencyList.map((c) => ({
            label: c.name,
            value: c.index,
          }))}
          value={currency || undefined}
          onChange={setCurrency}
          allowClear
        />
        <DatePicker
          style={CONTROL_STYLE}
          onChange={handleDateChange}
          value={parsedDate}
          format="DD.MM.YYYY"
          placeholder="Start Date"
        />
        <Input
          style={CONTROL_STYLE}
          type="number"
          min={1}
          max={365}
          placeholder="Forecast Days"
          value={days || ""}
          onChange={(e) => setDays(Number(e.target.value))}
        />
        <Button type="primary" onClick={handleForecast} loading={isLoading}>
          Forecast
        </Button>
      </Blockchildren>

      {result && (
        <>
          <div style={{ marginTop: 20 }}>
            Forecast for <b>{currency}</b> from <b>{startDate}</b> to{" "}
            <b>{endDate}</b> for <b>{days}</b> days in KGS
          </div>
          <div style={{ width: "80%", height: 500 }}>
            <MyChart data={{ currency, date: startDate, amount: days }} />
          </div>
          <div>
            <MyTable
              dataSource={data}
              columns={cols}
              exportFileName="users.csv"
              autoDownload
            />
          </div>
        </>
      )}
    </Blockwrapper>
  );
});
