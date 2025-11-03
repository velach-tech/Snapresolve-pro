import React, { useEffect, useRef, useState } from "react";

export default function GraphPanel() {
  const [expression, setExpression] = useState("sin(x)");
  const plotRef = useRef(null);

  useEffect(() => {
    const loadPlotly = async () => {
      const Plotly = (await import("plotly.js-dist-min")).default;
      plotGraph(Plotly);
    };
    loadPlotly();
  }, [expression]);

  const plotGraph = (Plotly) => {
    const xValues = Array.from({ length: 200 }, (_, i) => i / 10 - 10);
    let yValues;

    try {
      // eslint-disable-next-line no-new-func
      yValues = xValues.map((x) => Function("x", `return ${expression}`)(x));
    } catch {
      yValues = xValues.map(() => null);
    }

    const trace = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines",
      line: { width: 2 },
    };

    const layout = {
      title: `Graph of y = ${expression}`,
      xaxis: { title: "x" },
      yaxis: { title: "y" },
      margin: { t: 40 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: "var(--text)" },
    };

    Plotly.newPlot(plotRef.current, [trace], layout, { responsive: true });
  };

  return (
    <div className="graph-panel">
      <h3>📈 Graph Plotter</h3>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter function e.g. sin(x)"
      />
      <div ref={plotRef} className="graph"></div>
    </div>
  );
}