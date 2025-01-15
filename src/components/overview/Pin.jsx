import { Pin } from "lucide-react";
import React from "react";

function PinUnpin({ a }) {
  return (
    <div
      style={{
        // display: "inline-flex",
        flexDirection: "column",
        border: "rgba(0,0,0,0.4)",
        backgroundColor: "red",
        position: "absolute",
        right: "10px",
        padding: 10,
        display: a ? "inline-flex" : "none",
        // top: "100px",
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <span>Pin</span>
        <Pin />
      </div>
    </div>
  );
}

export default PinUnpin;
