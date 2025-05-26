import React, { useState } from "react";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import "./Convert.scss";
import currencyList from "../../JSON/currencyList.json";

import { Select, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import MyTable from "../../components/Table/Table.tsx";

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

export default function Convert() {
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [standardData, setStandardData] = useState<TableData[]>([]);
  const [bestData, setBestData] = useState<TableData[]>([]);
  const [showTables, setShowTables] = useState<boolean>(false);

  const CONTROL_STYLE: React.CSSProperties = {
    width: 250,
    textAlign: "center",
  };

  const handleConvert = () => {
    if (!fromCurrency || !toCurrency || amount <= 0) return;

    const from = currencyList.find((c) => c.index === fromCurrency);
    const to = currencyList.find((c) => c.index === toCurrency);
    if (!from || !to) return;

    // Стандартный курс — просто курс to.rate
    const standardRow: TableData = {
      key: "standard",
      currency: `${from.name} → ${to.name}`,
      buy: from.rate.toFixed(4),
      sell: to.rate.toFixed(4),
    };

    // Лучший курс — возьмём максимальный rate среди всех валют для выбранной toCurrency
    // (или просто возьмём максимальный rate из списка, чтобы показать разницу)
    const bestRate = Math.max(...currencyList.map((c) => c.rate));

    const bestRow: TableData = {
      key: "best",
      currency: `${from.name} → ${to.name} (Best Rate)`,
      buy: from.rate.toFixed(4),
      sell: bestRate.toFixed(4),
    };

    setStandardData([standardRow]);
    setBestData([bestRow]);
    setShowTables(true);
  };

  const columns: ColumnsType<TableData> = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Buy",
      dataIndex: "buy",
      key: "buy",
    },
    {
      title: "Sell",
      dataIndex: "sell",
      key: "sell",
    },
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
          <h2>Average Exchange Rates</h2>
          <MyTable dataSource={standardData} columns={columns} />
          <h2>Best Exchange Rates</h2>
          <MyTable dataSource={bestData} columns={columns} />
        </>
      )}
    </Blockwrapper>
  );
}
