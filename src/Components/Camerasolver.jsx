import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { evaluate } from "mathjs";

export default function CameraSolver({ addHistory }) {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState("Upload or capture an image of an equation");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractText(file);
    }
  };

  const extractText = async (file) => {
    setOutput("Reading equation...");
    try {
      const result = await Tesseract.recognize(file, "eng");
      const text = result.data.text.replace(/\n/g, " ");
      setOutput(`Detected: ${text}`);
      try {
        const ans = evaluate(text);
        addHistory(`${text} = ${ans}`);
        setOutput(`${text} = ${ans}`);
      } catch {
        setOutput(`Couldn't calculate "${text}"`);
      }
    } catch {
      setOutput("Error reading image");
    }
  };

  return (
    <div className="camera-panel">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "100%", marginTop: "1rem" }} />}
      <p>{output}</p>
    </div>
  );
}
