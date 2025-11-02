import React, { useState } from "react";
import { evaluate } from "mathjs";

export default function Calculator({ addHistory }) {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => setInput("");
  const handleCalculate = () => {
    try {
      const result = evaluate(input);
      addHistory(`${input} = ${result}`);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="keys">
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","+","^"].map((v) => (
          <button key={v} onClick={() => handleClick(v)}>{v}</button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}
