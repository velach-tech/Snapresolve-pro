import React, { useState } from "react";

export default function CameraSolver({ addHistory }) {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [result, setResult] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractText(file);
    }
  };

  const extractText = async (file) => {
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng");
      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();
      setRecognizedText(text.trim());
    } catch (err) {
      setRecognizedText("Error reading image");
    }
  };

  const solveMath = () => {
    try {
      const clean = recognizedText.replace(/[^-()\d/*+.]/g, "");
      const res = Function(`"use strict"; return (${clean})`)();
      setResult(res);
      addHistory(`${recognizedText} = ${res}`);
    } catch {
      setResult("Unable to solve");
    }
  };

  return (
    <div className="camera-solver">
      <h3>📸 Snap & Solve</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && <img src={image} alt="Uploaded" className="preview" />}

      {recognizedText && (
        <>
          <p><strong>Recognized Text:</strong> {recognizedText}</p>
          <button onClick={solveMath}>Solve</button>
        </>
      )}

      {result && (
        <p><strong>Result:</strong> {result}</p>
      )}
    </div>
  );
}
