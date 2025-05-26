import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import MyTable from "../../components/Table/Table.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import { requestStore } from "../../Store/Forecasting.ts";

const NationalBankRates = observer(() => {
  useEffect(() => {
    requestStore.fetchNationalBankRates();
  }, []);

  const columns = [
    { title: "Дата", dataIndex: "date", key: "date" },
    { title: "USD", dataIndex: "usd", key: "usd" },
    { title: "EUR", dataIndex: "eur", key: "eur" },
    { title: "RUB", dataIndex: "rub", key: "rub" },
  ];

  return (
    <Blockwrapper>
      <h1>Курсы Национального Банка</h1>
      <Blockchildren>
        {requestStore.isLoading ? (
          <p>Загрузка...</p>
        ) : requestStore.error ? (
          <p style={{ color: "red" }}>{requestStore.error}</p>
        ) : (
          <MyTable
            dataSource={
              Array.isArray(requestStore.result) ? requestStore.result : []
            }
            columns={columns}
          />
        )}
      </Blockchildren>
    </Blockwrapper>
  );
});

export default NationalBankRates;
