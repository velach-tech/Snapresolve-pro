import React from "react";

export default function HistoryPanel({ history }) {
  return (
    <div className="history-panel">
      <h3>🧾 Calculation History</h3>
      {history.length === 0 ? (
        <p>No history yet...</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
