// components/GoBackButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "8px 16px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
      }}
    >
      ⬅ Go Back
    </button>
  );
};

export default GoBackButton;
