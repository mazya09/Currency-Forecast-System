import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom"; // ВАЖНО: должен быть именно react-router-dom

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/" className="logo-link">
          Currency Forecast System
        </NavLink>
      </div>
      <nav className="header__nav">
        <NavLink
          to="/forecast"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Forecast
        </NavLink>
        <NavLink
          to="/forecastActual"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Forecast vs Actual
        </NavLink>
        <NavLink
          to="/convert"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Convert
        </NavLink>
        <NavLink
          to="/national-bank"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          National Bank Rates
        </NavLink>
        <NavLink
          to="/commercial-bank"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Commercial Bank Rates
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          History Archive
        </NavLink>
      </nav>
    </header>
  );
}
