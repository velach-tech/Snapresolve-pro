import React, { useState } from "react";

export default function Calculator({ addHistory }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => {
    setInput("");
    setResult("");
  };

  const calculate = () => {
    try {
      // Safe evaluation using Function instead of eval
      const res = Function(`"use strict"; return (${input})`)();
      setResult(res);
      addHistory(`${input} = ${res}`);
    } catch (err) {
      setResult("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/", 
    "4", "5", "6", "*", 
    "1", "2", "3", "-", 
    "0", ".", "=", "+"
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        <button className="clear" onClick={clear}>C</button>
        {buttons.map((btn, i) =>
          btn === "=" ? (
            <button key={i} onClick={calculate}>{btn}</button>
          ) : (
            <button key={i} onClick={() => handleClick(btn)}>{btn}</button>
          )
        )}
      </div>
    </div>
  );
}
