import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./Modules/Header/Header";
import Body from "./Modules/Body/Body";
import Footer from "./Modules/Footer/Footer";
import Forecast from "./Modules/Forecast/Forecast.tsx";
import './App.scss'

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
        </Routes>
      </main>
      dsdsd
      <Footer />
    </div>
  );
}
export default App;
