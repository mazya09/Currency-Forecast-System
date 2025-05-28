import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";
import { requestStore } from "../../Store/Forecasting.ts";
import "./CommercialBankRates.scss";
import GoBackButton from "../../components/GoBackButton/GoBackButton.tsx";

const CommercialBankRates = observer(() => {
  useEffect(() => {
    requestStore.fetchCommersBankRates();
  }, []);

  if (requestStore.isLoading) return <p>Загрузка...</p>;
  if (requestStore.error)
    return <p className="error-message">{requestStore.error}</p>;

  const bankData = Array.isArray(requestStore.result?.data)
    ? requestStore.result.data
    : [];

  return (
    <Blockwrapper>
      <h1 className="page-title">Commercial Banks Exchange Rates</h1>
      {bankData.map((bank: any) => {
        const rate =
          bank.rates?.find((r: any) => r.type === "regular") || bank.rates?.[0];
        if (!rate) return null;

        return (
          <div key={bank.id} className="myTableContainer">
            <h2 className="bank-title">
              {bank.title} /{bank.slug}{" "}
              <a
                href={bank.website_url}
                target="_blank"
                rel="noreferrer"
                className="bank-link"
              >
                🌐
              </a>
            </h2>

            <table className="myTable">
              <thead>
                <tr>
                  <th className="myTableHeaderCell">Currency</th>
                  <th className="myTableHeaderCell">Buy</th>
                  <th className="myTableHeaderCell">Sell</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "USD", buy: rate.buy_usd, sell: rate.sell_usd },
                  { code: "EUR", buy: rate.buy_eur, sell: rate.sell_eur },
                  { code: "RUB", buy: rate.buy_rub, sell: rate.sell_rub },
                ].map((currency, idx) => (
                  <tr
                    key={currency.code}
                    className={
                      idx % 2 === 0 ? "myTableRowEven" : "myTableRowOdd"
                    }
                  >
                    <td className="myTableCell">{currency.code}</td>
                    <td className="myTableCell">{currency.buy ?? "-"}</td>
                    <td className="myTableCell">{currency.sell ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
      <div className="gobeck">
        <GoBackButton />
      </div>
    </Blockwrapper>
  );
});

export default CommercialBankRates;
