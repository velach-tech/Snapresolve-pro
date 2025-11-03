import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

const GraphPanel = ({ expression }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!expression) return;

    try {
      const xValues = [];
      const yValues = [];

      for (let x = -10; x <= 10; x += 0.1) {
        // Using math.js safely
        const math = window.math || require("mathjs");
        const scope = { x };
        const y = math.evaluate(expression, scope);
        xValues.push(x);
        yValues.push(y);
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
        margin: { t: 40 },
        paper_bgcolor: "#f8f8f8",
        plot_bgcolor: "#f8f8f8",
        xaxis: { title: "x" },
        yaxis: { title: "y" },
      };

      Plotly.newPlot(graphRef.current, [trace], layout, { displayModeBar: false });
    } catch (err) {
      console.error("Invalid expression for graph:", err);
    }
  }, [expression]);

  return (
    <div
      ref={graphRef}
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "10px",
        background: "#fff",
        marginTop: "20px",
      }}
    />
  );
};

export default GraphPanel;
