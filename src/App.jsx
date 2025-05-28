import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Modules/Header/Header";
import Body from "./Modules/Body/Body";
import Footer from "./Modules/Footer/Footer";
import Forecast from "./Modules/Forecast/Forecast.tsx";
import Convert from "./Modules/Convert/Convert.tsx";
import NationalBankRates from "./Modules/NationalBankRates/NationalBankRates.tsx";
import CommercialBankRates from "./Modules/CommercialBankRates/CommercialBankRates.tsx";
import "./App.scss";
import HistoryArchive from "./Modules/HistoryArchive/HistoryArchive.tsx";
import ForecastActual from "./Modules/ForecastActual/ForecastActual.tsx";

function App() {
  const [value, setValue] = useState("");
  return (
    <div className="wrapper">
      <Header />
      <main className="wrapper-content">
        <Routes>
          <Route index element={<Body />} />
          <Route
            path="forecast"
            element={
              <Forecast value={value} onChange={(val) => setValue(val)} />
            }
          />
          <Route path="/convert" element={<Convert />} />
          <Route path="/forecastActual" element={<ForecastActual />} />
          <Route path="/national-bank" element={<NationalBankRates />} />
          <Route path="/commercial-bank" element={<CommercialBankRates />} />
          <Route path="/history" element={<HistoryArchive />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
