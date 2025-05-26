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

export default observer(function Forecast() {
  const CONTROL_STYLE: React.CSSProperties = {
    width: 250,
    textAlign: "center",
    marginBottom: 10,
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

  // Уведомление об ошибке
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
    setStartDate(date ? date.format("YYYY-MM-DD") : "");
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

  // Преобразуем результат в формат для таблицы
  const forecastTableData = React.useMemo(() => {
    if (!Array.isArray(result?.data?.predictedRates) || !startDate) return [];

    return result.data.predictedRates.map((value: number, index: number) => {
      const date = dayjs(startDate).add(index, "day").format("DD.MM.YYYY");
      return {
        key: index,
        date,
        value: value.toFixed(4),
      };
    });
  }, [result, startDate]);

  const cols = [
    { title: "Дата", dataIndex: "date", key: "date" },
    { title: "Прогноз (KGS)", dataIndex: "value", key: "value" },
  ];

  const chartData = {
    currency: result?.data?.currency ?? "",
    date: result?.data?.startDate ?? "",
    amount: Array.isArray(result?.data?.predictedRates)
      ? result.data.predictedRates.length
      : 0,
    historicalRates: Array.isArray(result?.data?.historyRates)
      ? result.data.historyRates
      : [],
    predictedRates: Array.isArray(result?.data?.predictedRates)
      ? result.data.predictedRates
      : [],
  };

  return (
    <Blockwrapper>
      <h1>Currency Forecast</h1>
      <Blockchildren>
        <Select
          style={CONTROL_STYLE}
          placeholder="Валюта"
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
          placeholder="Дата начала"
        />
        <Input
          style={CONTROL_STYLE}
          type="number"
          min={1}
          max={365}
          placeholder="Количество дней"
          value={days || ""}
          onChange={(e) => setDays(Number(e.target.value))}
        />
        <Button type="primary" onClick={handleForecast} loading={isLoading}>
          Спрогнозировать
        </Button>
      </Blockchildren>

      {Array.isArray(result?.data?.predictedRates) && (
        <>
          <div style={{ marginTop: 20 }}>
            Прогноз курса <b>{currency}</b> с <b>{startDate}</b> по{" "}
            <b>{endDate}</b> на <b>{days}</b> дней (в KGS)
          </div>

          <div style={{ width: "80%", height: 500, marginTop: 20 }}>
            <MyChart data={chartData} />
          </div>

          <div style={{ marginTop: 30 }}>
            <MyTable
              dataSource={forecastTableData}
              columns={cols}
              exportFileName={`forecast-${currency}.csv`}
              autoDownload
            />
          </div>
        </>
      )}
    </Blockwrapper>
  );
});
