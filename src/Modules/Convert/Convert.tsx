import React from "react";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import "./Convert.scss";
import currencyList from "../../JSON/currencyList.json";

import { Select, Input, Button } from "antd";
export default function Convert() {
    const CONTROL_STYLE: React.CSSProperties = {
      width: 250,
      textAlign: "center",
    };
  return (
    <Blockwrapper>
      <h1>Currency Converter</h1>
      <span>Choose currency and amount to be converted.</span>
      <Blockchildren>
      <Select
          style={CONTROL_STYLE}
          placeholder="Currency"
          options={currencyList.map((c) => ({
            label: c.name,
            value: c.index,
          }))}
          // value={currency || undefined}
          // onChange={setCurrency}
          allowClear
        />
                <Select
          style={CONTROL_STYLE}
          placeholder="Currency"
          options={currencyList.map((c) => ({
            label: c.name,
            value: c.index,
          }))}
          // value={currency || undefined}
          // onChange={setCurrency}
          allowClear
        />
        <Input
         style={CONTROL_STYLE}
          type="number"
          min={1}
          max={365}
          placeholder="Forecast Days"
          // value={days || ""}
          // onChange={(e) => setDays(Number(e.target.value))}
        />
        <Button
          type="primary"
          // onClick={handleForecast}
          // loading={isLoading}
          style={{ width: 250 }}
        >
          Forecast
        </Button>
      </Blockchildren>
    </Blockwrapper>
  );
}
