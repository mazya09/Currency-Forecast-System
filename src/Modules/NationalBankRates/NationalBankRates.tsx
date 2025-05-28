import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import MyTable from "../../components/Table/Table.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import { requestStore } from "../../Store/Forecasting.ts";
import Flag from "react-world-flags";
import "./NationalBankRates.scss";
import GoBackButton from "../../components/GoBackButton/GoBackButton.tsx";

const countryCodeMap: Record<string, string> = {
  USD: "US",
  EUR: "EU",
  KZT: "KZ",
  RUB: "RU",
  GBP: "GB",
  DKK: "DK",
  INR: "IN",
  CAD: "CA",
  CNY: "CN",
  KRW: "KR",
  NOK: "NO",
  XDR: "UN",
  SEK: "SE",
  CHF: "CH",
  JPY: "JP",
  AMD: "AM",
  BYR: "BY",
  MDL: "MD",
  TJS: "TJ",
  UZS: "UZ",
  UAH: "UA",
  KWD: "KW",
  HUF: "HU",
  CZK: "CZ",
  NZD: "NZ",
  PKR: "PK",
  AUD: "AU",
  TRY: "TR",
  AZN: "AZ",
  SGD: "SG",
  AFN: "AF",
  BGN: "BG",
  BRL: "BR",
  GEL: "GE",
  AED: "AE",
  IRR: "IR",
  MYR: "MY",
  MNT: "MN",
  TWD: "TW",
  TMT: "TM",
  PLN: "PL",
  SAR: "SA",
  BYN: "BY",
  OMR: "OM",
  HKD: "HK",
  IDR: "ID",
};

const NationalBankRates = observer(() => {
  useEffect(() => {
    requestStore.fetchNationalBankRates();
  }, []);

  const columns = [
    {
      title: "Currency",
      dataIndex: "Currency",
      key: "Currency",
      render: (currency: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Flag
            code={countryCodeMap[currency] || "UN"}
            style={{ width: 24, height: 16 }}
          />
          <span>{currency}</span>
        </div>
      ),
    },
    { title: "Rate to KGS", dataIndex: "RatetoKGS", key: "RatetoKGS" },
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
      <div className="gobeck">
        <GoBackButton />
      </div>
    </Blockwrapper>
  );
});

export default NationalBankRates;
