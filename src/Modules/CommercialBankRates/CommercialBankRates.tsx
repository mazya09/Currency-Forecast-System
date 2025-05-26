import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import MyTable from "../../components/Table/Table.tsx";
import type { ColumnsType } from "antd/es/table";
import { requestStore } from "../../Store/Forecasting.ts";

const CommercialBankRates = observer(() => {
  useEffect(() => {
    requestStore.fetchCommersBankRates();
  }, []);

  const rateColumns: ColumnsType<any> = [
    { title: "Тип", dataIndex: "type", key: "type" },
    { title: "Покупка USD", dataIndex: "buy_usd", key: "buy_usd" },
    { title: "Продажа USD", dataIndex: "sell_usd", key: "sell_usd" },
    { title: "Покупка EUR", dataIndex: "buy_eur", key: "buy_eur" },
    { title: "Продажа EUR", dataIndex: "sell_eur", key: "sell_eur" },
    { title: "Покупка RUB", dataIndex: "buy_rub", key: "buy_rub" },
    { title: "Продажа RUB", dataIndex: "sell_rub", key: "sell_rub" },
    { title: "Покупка KZT", dataIndex: "buy_kzt", key: "buy_kzt" },
    { title: "Продажа KZT", dataIndex: "sell_kzt", key: "sell_kzt" },
    { title: "Дата", dataIndex: "created_at", key: "created_at" },
  ];

  if (requestStore.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (requestStore.error) {
    return <p style={{ color: "red" }}>{requestStore.error}</p>;
  }

  const bankData = Array.isArray(requestStore.result)
    ? requestStore.result
    : [];

  return (
    <Blockwrapper>
      <h1>Курсы коммерческих банков</h1>
      {bankData.map((bank: any) => {
        const flatRates = bank.rates.map((rate: any) => ({
          type: rate.type,
          buy_usd: rate.buy_usd,
          sell_usd: rate.sell_usd,
          buy_eur: rate.buy_eur,
          sell_eur: rate.sell_eur,
          buy_rub: rate.buy_rub,
          sell_rub: rate.sell_rub,
          buy_kzt: rate.buy_kzt,
          sell_kzt: rate.sell_kzt,
          created_at: new Date(rate.created_at).toLocaleString("ru-RU"),
        }));

        return (
          <Blockchildren key={bank.id}>
            <h2>{bank.title}</h2>
            <MyTable dataSource={flatRates} columns={rateColumns} />
          </Blockchildren>
        );
      })}
    </Blockwrapper>
  );
});

export default CommercialBankRates;
