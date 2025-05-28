import React from "react";
import { observer } from "mobx-react-lite";
import { Select, DatePicker, Button, notification } from "antd";
import dayjs, { Dayjs } from "dayjs";
import MyChart from "../../components/Grafiki/Grafiki.tsx";
import { requestStore } from "../../Store/Forecasting.ts";
import MyTable from "../../components/Table/Table.tsx";
import currencyList from "../../JSON/currencyList.json";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import GoBackButton from "../../components/GoBackButton/GoBackButton.tsx";

export default observer(function HistoryArchive() {
  const CONTROL_STYLE: React.CSSProperties = {
    width: 250,
    textAlign: "center",
  };

  const {
    currency,
    startDate,
    endDate,
    result,
    isLoading,
    error,
    setCurrency,
    setStartDate,
    setEndDate,
    historyArchive,
  } = requestStore;

  React.useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка",
        description: error,
        placement: "topRight",
      });
      requestStore.error = null;
    }
  }, [error]);

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date ? date.format("YYYY-MM-DD") : "");
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date ? date.format("YYYY-MM-DD") : "");
  };

  const handleForecast = () => {
    if (!currency || !startDate || !endDate) {
      notification.error({
        message: "Ошибка",
        description: "Заполните все поля",
        placement: "topRight",
      });
      return;
    }
    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      notification.error({
        message: "Ошибка",
        description: "Дата окончания не может быть раньше даты начала",
        placement: "topRight",
      });
      return;
    }
    historyArchive(currency, startDate, endDate);
  };

  const days = React.useMemo(
    () => (startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") + 1 : 0),
    [startDate, endDate]
  );

  const ratesData = React.useMemo(() => {
    return Array.isArray(result?.data) ? result.data : [];
  }, [result]);

  const chartData = React.useMemo(() => ({
    currency: currency || "",
    date: startDate || "",
    amount: days,
    historicalRates: ratesData.map((item) => item.rate),
    predictedRates: [], // Можно добавить прогнозные данные, если есть
  }), [currency, startDate, days, ratesData]);

  const forecastTableData = React.useMemo(() => 
    ratesData.map((item, index) => ({
      key: index,
      date: dayjs(item.date).format("DD.MM.YYYY"),
      value: item.rate.toFixed(4),
    })),
    [ratesData]
  );

  const cols = React.useMemo(() => [
    { title: "Дата", dataIndex: "date", key: "date" },
    { title: "Курс (KGS)", dataIndex: "value", key: "value" },
  ], []);

  const hasData = ratesData.length > 0;

  return (
    <Blockwrapper>
      <h1>Currency Forecast</h1>
      <Blockchildren>
        <Select
          style={CONTROL_STYLE}
          placeholder="Валюта"
          options={currencyList.map((c) => ({ label: c.name, value: c.index }))}
          value={currency || undefined}
          onChange={setCurrency}
          allowClear
        />
        <DatePicker
          style={CONTROL_STYLE}
          onChange={handleStartDateChange}
          value={startDate ? dayjs(startDate) : null}
          format="DD.MM.YYYY"
          placeholder="Дата начала"
        />
        <DatePicker
          style={CONTROL_STYLE}
          onChange={handleEndDateChange}
          value={endDate ? dayjs(endDate) : null}
          format="DD.MM.YYYY"
          placeholder="Дата окончания"
        />
        <Button type="primary" onClick={handleForecast} loading={isLoading}>
          Show History
        </Button>
      </Blockchildren>

      {hasData ? (
        <>
          <div style={{ marginTop: 20 }}>
            История курса <b>{currency}</b> с <b>{startDate}</b> по{" "}
            <b>{endDate}</b> на <b>{days}</b> дней (в KGS)
          </div>

          <div style={{ width: "85%", height: 500, marginTop: 20 }}>
            <MyChart data={chartData} />
          </div>

          <div style={{ width: "85%", marginTop: 20 }}>
            <MyTable
              dataSource={forecastTableData}
              columns={cols}
              exportFileName={`forecast-${currency}.csv`}
              autoDownload
            />
            <div className="gobeck">
              <GoBackButton />
            </div>
          </div>
        </>
      ) : (
        <p style={{ marginTop: 20, color: "#888" }}>
          Нет данных для отображения. Пожалуйста, проверьте параметры запроса.
        </p>
      )}

    </Blockwrapper>
  );
});
