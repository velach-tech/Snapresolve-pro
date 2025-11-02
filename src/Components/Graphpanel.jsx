import React, { useEffect, useRef } from "react";
import { create, all } from "mathjs";

const math = create(all);

export default function GraphPanel() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#888";

    // axes
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // example graph y = sin(x)
    ctx.beginPath();
    ctx.strokeStyle = "#00aaff";
    for (let x = -Math.PI * 2; x <= Math.PI * 2; x += 0.1) {
      const y = Math.sin(x);
      const px = width / 2 + x * 40;
      const py = height / 2 - y * 40;
      if (x === -Math.PI * 2) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, []);

  return (
    <div className="graph-panel">
      <canvas ref={canvasRef} width="400" height="300"></canvas>
      <p>Sample graph: y = sin(x)</p>
    </div>
  );
}
