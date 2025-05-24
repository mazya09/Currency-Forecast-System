import React from "react";
import card1_json from "../../JSON/card1_json.json";
import link_json from "../../JSON/link_json.json"
import "./Body.scss";

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
          {card1_json.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={item.title} width={100} />
              <h6>{item.title}</h6>
            </div>
          ))}
        </div>
      </div>
      <div className="body_link">
        {link_json.map((item) => (
          <div key={item.id}>
            
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button>{item.button}</button>
          </div>
        ))}
      </div>
    </main>
  );
}
