// src/components/Calculator.jsx   <-- use your file's exact name/casing
import React, { useState } from "react";
import { evaluate } from "mathjs"; // mathjs is already in your deps
import "./Calculator.css";         // must be created next

export default function Calculator() {
  const [input, setInput] = useState("");
  const [historyVisible, setHistoryVisible] = useState(false);

  const buttons = [
    "C", "(", ")", "%",
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "+/−", "0", ".", "="
  ];

  const handleClick = (btn) => {
    if (btn === "C") {
      setInput("");
      return;
    }
    if (btn === "=") {
      try {
        // replace display symbols with mathjs-friendly ones
        const expr = input.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-").replace(/,/g, "");
        const result = evaluate(expr);
        setInput(String(result));
      } catch (e) {
        setInput("Error");
      }
      return;
    }
    if (btn === "+/−") {
      // toggle sign
      if (!input) return;
      if (input.startsWith("-")) setInput(input.slice(1));
      else setInput("-" + input);
      return;
    }

    setInput((prev) => (prev === "Error" ? btn : prev + btn));
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="top-row">
          <h2 className="brand">SnapSolve Pro</h2>
          <button className="mode-btn" onClick={() => setHistoryVisible(h => !h)}>
            ☰
          </button>
        </div>

        <div className="history-area">
          {/* optional: show brief history later */}
        </div>

        <input className="display" value={input} readOnly />

        <div className="buttons">
          {buttons.map((b) => {
            const isOperator = ["+", "−", "×", "÷", "%"].includes(b);
            return (
              <button
                key={b}
                onClick={() => handleClick(b)}
                className={
                  b === "C" ? "clear"
                  : b === "=" ? "equals"
                  : isOperator ? "operator"
                  : b === "+/−" ? "sign"
                  : ""
                }
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
