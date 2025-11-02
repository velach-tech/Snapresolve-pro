import React, { useState } from "react";
import Calculator from "./components/Calculator";
import CameraSolver from "./components/CameraSolver";
import ThemeSwitcher from "./components/ThemeSwitcher";
import HistoryPanel from "./components/HistoryPanel";
import GraphPanel from "./components/GraphPanel";
import "./styles.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [activePanel, setActivePanel] = useState("calculator");
  const [history, setHistory] = useState([]);

  const addHistory = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>SnapSolve Pro</h1>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </header>

      <nav className="nav">
        <button onClick={() => setActivePanel("calculator")}>Calculator</button>
        <button onClick={() => setActivePanel("camera")}>Camera</button>
        <button onClick={() => setActivePanel("graph")}>Graph</button>
        <button onClick={() => setActivePanel("history")}>History</button>
      </nav>

      <main>
        {activePanel === "calculator" && (
          <Calculator addHistory={addHistory} />
        )}
        {activePanel === "camera" && (
          <CameraSolver addHistory={addHistory} />
        )}
        {activePanel === "graph" && <GraphPanel />}
        {activePanel === "history" && (
          <HistoryPanel history={history} />
        )}
      </main>

      <footer>
        <p>© 2025 SnapSolve Pro</p>
      </footer>
    </div>
  );
}
