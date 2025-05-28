import React from "react";
import "./Footer.scss";

export default function Footer({children}) {
  return (
    <footer>
      <div>
        {children}
      </div>
      &copy; 2025 Bakyt Kudaibergenov - Currency Forecasting
    </footer>
  );
}
