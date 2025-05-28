import React, { useEffect, useState } from "react";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import "./Convert.scss";
import currencyList from "../../JSON/currencyList.json";
import { requestStore } from "../../Store/Forecasting.ts";

import { Select, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import MyTable from "../../components/Table/Table.tsx";
import { observer } from "mobx-react-lite";
import GoBackButton from "../../components/GoBackButton/GoBackButton.tsx";

interface Currency {
  index: string;
  name: string;
  rate: number;
}

interface TableData {
  key: string;
  currency: string;
  buy: string;
  sell: string;
}

const Convert: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [standardData, setStandardData] = useState<TableData[]>([]);
  const [bestData, setBestData] = useState<TableData[]>([]);
  const [showTables, setShowTables] = useState<boolean>(false);
  const [conversionResult, setConversionResult] = useState<string>("");

  const CONTROL_STYLE: React.CSSProperties = {
    width: 250,
    textAlign: "center",
  };

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || amount <= 0) return;

    try {
      await requestStore.sendconvert({
        from: fromCurrency,
        to: toCurrency,
        amount,
      });

      const data = requestStore.result?.data;
      if (!data) return;

      const fromRate = data.fromRate;
      const toRate = data.toRate;
      const convertedAmount = data.convertedAmount;

      const from = currencyList.find((c) => c.index === fromCurrency);
      const to = currencyList.find((c) => c.index === toCurrency);
      if (!from || !to) return;

      const standardRow: TableData = {
        key: "standard",
        currency: `${from.name} → ${to.name}`,
        buy: fromRate.toFixed(4),
        sell: toRate.toFixed(4),
      };

      const bestRate = Math.max(
        ...currencyList.map((c) => {
          const key = c.index.toLowerCase();
          return requestStore.result?.data
            ? requestStore.result.data[`sell_${key}`] ?? 0
            : 0;
        })
      );

      const bestRow: TableData = {
        key: "best",
        currency: `${from.name} → ${to.name} (Best Rate)`,
        buy: fromRate.toFixed(4),
        sell: bestRate.toFixed(4),
      };

      setStandardData([standardRow]);
      setBestData([bestRow]);
      setShowTables(true);

      // Формируем строку результата конвертации
      // Например: "100.00 AED = 106.74 EUR"
      // и "1 EUR ≈ 0.94 AED" — курс обратный (1 / (toRate/fromRate))
      const rateRatio = fromRate && toRate ? toRate / fromRate : 1;
      const reverseRate = rateRatio ? 1 / rateRatio : 1;

      setConversionResult(
        `${amount.toFixed(2)} ${from.index} = ${convertedAmount.toFixed(2)} ${
          to.index
        }\n` + `1 ${to.index} ≈ ${reverseRate.toFixed(4)} ${from.index}`
      );
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  useEffect(() => {
    requestStore.currency = "USD";
    requestStore.startDate = "2025-05-01";
    requestStore.days = 10;
    requestStore.BankRates();
  }, []);

  const columns: ColumnsType<TableData> = [
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Buy", dataIndex: "buy", key: "buy" },
    { title: "Sell", dataIndex: "sell", key: "sell" },
  ];

  return (
    <Blockwrapper>
      <h1>Currency Converter</h1>
      <span>Choose currency and amount to be converted.</span>

      <Blockchildren>
        <Select
          style={CONTROL_STYLE}
          placeholder="From Currency"
          options={currencyList.map((c: Currency) => ({
            label: c.name,
            value: c.index,
          }))}
          onChange={(value: string) => setFromCurrency(value)}
          allowClear
        />
        <Select
          style={CONTROL_STYLE}
          placeholder="To Currency"
          options={currencyList.map((c: Currency) => ({
            label: c.name,
            value: c.index,
          }))}
          onChange={(value: string) => setToCurrency(value)}
          allowClear
        />
        <Input
          style={CONTROL_STYLE}
          type="number"
          min={1}
          placeholder="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button type="primary" style={{ width: 250 }} onClick={handleConvert}>
          Convert
        </Button>
      </Blockchildren>

      {showTables && (
        <>
          {conversionResult && (
            <div className="сonversion">
              Conversion Result
              <br />
              {conversionResult}
            </div>
          )}
          <h2>Converted Rates</h2>
          <MyTable dataSource={standardData} columns={columns} />
          <h2>Best Exchange Rates</h2>
          <MyTable dataSource={bestData} columns={columns} />
          <div className="gobeck">
            <GoBackButton />
          </div>
        </>
      )}
    </Blockwrapper>
  );
};

export default observer(Convert);
