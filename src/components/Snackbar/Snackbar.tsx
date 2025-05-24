// components/Snackbar.tsx
import React, { useEffect, useState } from "react";

type SnackbarProps = {
  message: string | null;
  duration?: number; // ms, время показа
  onClose: () => void;
};

export default function Snackbar({ message, duration = 3000, onClose }: SnackbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#f44336",
        color: "white",
        padding: "12px 24px",
        borderRadius: 4,
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}
