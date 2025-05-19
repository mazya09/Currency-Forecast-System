import React from "react";
import './Header.scss'

export default function Header() {
  return (
    <header>
      <div>
        <span className="header">Currence Forecast System</span>
      </div>
      <div className="header_wrapper">
        <p>Forecast</p>
        <p>Convert</p>
        <p>National Bank Rates</p>
        <p>Commercial Bank Rates</p>
        <p>History Archive</p>
      </div>
    </header>
  );
}
