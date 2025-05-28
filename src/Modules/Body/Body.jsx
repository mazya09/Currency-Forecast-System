import React from "react";
import  { dataItems } from "../../JSON/card1_json";
import link_json from "../../JSON/link_json.json";
import "./Body.scss";
import { NavLink } from "react-router-dom";

export default function Body() {
  return (
    <main className="body_wrapper">
      <div className="body_content">
        <div className="body_title">Currence Forecast System</div>
        <div className="body_description">
          A smart web-based solution for analyzing, forecasting, and converting
          currencies based on data from the National Bank and commercial banks
          of Kyrgyzstan.
        </div>
        <div className="image_placeholder">
          {dataItems.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={item.title} width={100} />
              <h6>{item.title}</h6>
            </div>
          ))}
        </div>
      </div>
      <div className="body_link">
        {link_json.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              {item.button}
            </NavLink>
          </div>
        ))}
      </div>
    </main>
  );
}
