import React from "react";

const HistoryPanel = ({ history, onClear }) => {
  return (
    <div
      style={{
        background: "#f5f5f5",
        borderRadius: "10px",
        padding: "15px",
        marginTop: "15px",
        height: "150px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ textAlign: "center" }}>History</h3>
      {history.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No calculations yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item, index) => (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "5px 0",
                fontSize: "14px",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={onClear}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "10px",
            borderRadius: "6px",
            background: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default HistoryPanel;
