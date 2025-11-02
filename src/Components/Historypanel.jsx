import React from "react";

export default function HistoryPanel({ history }) {
  return (
    <div className="history-panel">
      <h3>History</h3>
      {history.length === 0 ? (
        <p>No calculations yet.</p>
      ) : (
        <ul>
          {history.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
