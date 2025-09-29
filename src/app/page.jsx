"use client"
import { useEffect, useState } from "react";

export default function Home() {
  // THEME
  const [activeTheme, setActiveTheme] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored !== null) {
      setActiveTheme(stored === "true");
    } else if (typeof window !== "undefined" && window.matchMedia) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setActiveTheme(prefersDark);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", activeTheme.toString());
  }, [activeTheme]);
  const toggleTheme = () => setActiveTheme((p) => !p);

  // NAV / WELCOME
  const [activeMenu, setActiveMenu] = useState(false);
  const toggleMenu = () => setActiveMenu((s) => !s);
  const [welcomeMessage, setWelcomeMessage] = useState(false);
  const toggleWelcome = () => setWelcomeMessage((s) => !s);

  // INPUT STATES & RESULTS
  // Cone
  const [coneRadius, setConeRadius] = useState("");
  const [coneHeight, setConeHeight] = useState("");
  const [coneSlant, setConeSlant] = useState("");
  const [useSlant, setUseSlant] = useState(false);
  const [coneResult, setConeResult] = useState("—");
  const [coneFormulaText, setConeFormulaText] = useState("");

  // Pyramid
  const [pyramidBase, setPyramidBase] = useState("");
  const [pyramidHeight, setPyramidHeight] = useState("");
  const [pyramidResult, setPyramidResult] = useState("—");
  const [pyramidFormulaText, setPyramidFormulaText] = useState("");

  // Cylinder
  const [cylRadius, setCylRadius] = useState("");
  const [cylHeight, setCylHeight] = useState("");
  const [cylResult, setCylResult] = useState("—");
  const [cylFormulaText, setCylFormulaText] = useState("");

  // HELPERS
  const handleChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === "") {
      setter("");
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 0) setter(value);
    }
  };
  const parseNum = (v) => {
    if (v === "" || v === null) return NaN;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : NaN;
  };

  // HISTORY
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("calcHistory");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  const addHistoryEntry = (shape, inputsText, formulaText, resultStr) => {
    const entry = {
      shape,
      inputs: inputsText,
      formula: formulaText,
      result: resultStr,
      date: new Date().toLocaleString(),
    };
    setHistory((prev) => [entry, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  const exportHistory = () => {
    if (!history.length) return;
    const text = history.map(h => `[${h.shape}] ${h.result} | ${h.inputs} | ${h.formula} | ${h.date}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "calc-history.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const copyHistory = async () => {
    if (!history.length) return alert("No history to copy");
    const text = history.map(h => `[${h.shape}] ${h.result} | ${h.inputs} | ${h.formula} | ${h.date}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      alert("History copied to clipboard!");
    } catch {
      alert("Could not copy to clipboard.");
    }
  };

  // CALCULATIONS (compute, update result/formula text, add history)
  const calculateCone = () => {
    const r = parseNum(coneRadius);
    const h = parseNum(coneHeight);
    const l = useSlant ? parseNum(coneSlant) : Math.sqrt(r * r + h * h);

    if (!Number.isFinite(r) || !Number.isFinite(l)) {
      setConeResult("—");
      setConeFormulaText("");
      return;
    }

    const result = Math.PI * r * (l + r);
    const rounded = result.toFixed(2);
    setConeResult(rounded);

    // show substituted formula
    const lStr = Number.isFinite(l) ? l.toFixed(4) : "—";
    const formulaText = `SA = π × ${r} × (${lStr} + ${r}) = ${rounded}`;
    setConeFormulaText(formulaText);

    // inputs text for history
    const inputsText = useSlant ? `r=${r}, slant=${lStr}` : `r=${r}, h=${h}`;
    addHistoryEntry("Cone", inputsText, "SA = πr(l + r)", rounded);
  };

  const calculatePyramid = () => {
    const b = parseNum(pyramidBase);
    const h = parseNum(pyramidHeight);
    if (!Number.isFinite(b) || !Number.isFinite(h)) {
      setPyramidResult("—");
      setPyramidFormulaText("");
      return;
    }
    const side = b / 2;
    const slant = Math.sqrt(side * side + h * h);
    const result = b * b + 2 * b * slant;
    const rounded = result.toFixed(2);
    setPyramidResult(rounded);

    const slantStr = slant.toFixed(4);
    const formulaText = `SA = ${b}² + 2×${b}×√(${side}² + ${h}²) = ${rounded}`;
    setPyramidFormulaText(formulaText);

    const inputsText = `b=${b}, h=${h}`;
    addHistoryEntry("Pyramid", inputsText, "SA = b² + 2b√((b/2)² + h²)", rounded);
  };

  const calculateCylinder = () => {
    const r = parseNum(cylRadius);
    const h = parseNum(cylHeight);
    if (!Number.isFinite(r) || !Number.isFinite(h)) {
      setCylResult("—");
      setCylFormulaText("");
      return;
    }
    const result = 2 * Math.PI * r * (h + r);
    const rounded = result.toFixed(2);
    setCylResult(rounded);

    const formulaText = `SA = 2π × ${r} × (${h} + ${r}) = ${rounded}`;
    setCylFormulaText(formulaText);

    const inputsText = `r=${r}, h=${h}`;
    addHistoryEntry("Cylinder", inputsText, "SA = 2πr(h + r)", rounded);
  };

  // RESET (clear inputs + result + formula for a shape)
  const resetInputs = (shape) => {
    if (shape === "Cone") {
      setConeRadius(""); setConeHeight(""); setConeSlant(""); setUseSlant(false);
      setConeResult("—"); setConeFormulaText("");
    }
    if (shape === "Pyramid") {
      setPyramidBase(""); setPyramidHeight("");
      setPyramidResult("—"); setPyramidFormulaText("");
    }
    if (shape === "Cylinder") {
      setCylRadius(""); setCylHeight("");
      setCylResult("—"); setCylFormulaText("");
    }
  };

  // FILTERED HISTORY VIEW
  const visibleHistory = history.filter(h => filter === "All" || h.shape === filter);

  // RENDER
  return (
    <div className={`parent ${activeTheme ? "theme" : ""}`}>
      <div className={`msg ${welcomeMessage ? "close" : ""}`}>
        <h1>This calculator was built by <a href="https://iamadedevs.vercel.app/" target="_blank" rel="noreferrer">AdeDevs</a></h1>
        <button onClick={toggleWelcome}>Open</button>
      </div>

      <nav className="navbar">
        <h1 className="logo">Surface Area Calculator</h1>
        <ul className="desk-nav">
          <li><a href="#cone">Cone</a></li>
          <li><a href="#pyramid">Pyramid</a></li>
          <li><a href="#cylinder">Cylinder</a></li>
          <li><a href="#history">History</a></li>
          <button onClick={toggleTheme} className="toggle"><ion-icon name="contrast"></ion-icon></button>
          <button onClick={toggleMenu} className="menu"><ion-icon name="menu"></ion-icon></button>
        </ul>
        <ul className={`mobile-nav ${activeMenu ? "active" : ""}`}>
          <button onClick={toggleMenu} className="menu"><ion-icon name="menu"></ion-icon></button>
          <li><a onClick={toggleMenu} href="#cone">Cone</a></li>
          <li><a onClick={toggleMenu} href="#pyramid">Pyramid</a></li>
          <li><a onClick={toggleMenu} href="#cylinder">Cylinder</a></li>
          <li><a onClick={toggleMenu} href="#history">History</a></li>
        </ul>
      </nav>

      <div className={`overlay ${activeMenu ? "active" : ""}`} onClick={toggleMenu}></div>

      <main className="home">
        <h1>Surface Area Calculator</h1>
        <p>Interactive tool to compute the total surface area of cones, pyramids, and cylinders. Enter dimensions → click Calculate.</p>

        <section className="calculators">
          {/* CONE */}
          <div className="calc-box" id="cone">
            <h1>Cone Surface Area</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Base Radius</label>
              <input type="number" placeholder="Enter Radius" value={coneRadius} onChange={handleChange(setConeRadius)} />

              {!useSlant && (
                <>
                  <label>Height</label>
                  <input type="number" placeholder="Enter Height" value={coneHeight} onChange={handleChange(setConeHeight)} />
                </>
              )}

              {useSlant && (
                <>
                  <label>Slant Height</label>
                  <input type="number" placeholder="Enter Slant Height" value={coneSlant} onChange={handleChange(setConeSlant)} />
                </>
              )}

              <div>
                <label>
                  <input type="checkbox" checked={useSlant} onChange={() => setUseSlant(s => !s)} />
                  &nbsp; Provide slant height directly
                </label>
              </div>

              <div className="calc-actions">
                <button type="button" onClick={calculateCone}>Calculate</button>
                <button className="reset-btn" type="button" onClick={() => resetInputs("Cone")}>Reset</button>
              </div>

              <div className="solution">
                <p><strong>Result:</strong> {coneResult}</p>
                <p><strong>Formula:</strong> {coneFormulaText || "SA = πr(l + r), l = √(r² + h²)"}</p>
              </div>
            </form>
          </div>

          {/* PYRAMID */}
          <div className="calc-box" id="pyramid">
            <h1>Square Pyramid Surface Area</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Base Side Length</label>
              <input type="number" placeholder="Enter Base Side" value={pyramidBase} onChange={handleChange(setPyramidBase)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={pyramidHeight} onChange={handleChange(setPyramidHeight)} />

              <div className="calc-actions">
                <button type="button" onClick={calculatePyramid}>Calculate</button>
                <button className="reset-btn" type="button" onClick={() => resetInputs("Pyramid")}>Reset</button>
              </div>

              <div className="solution">
                <p><strong>Result:</strong> {pyramidResult}</p>
                <p><strong>Formula:</strong> {pyramidFormulaText || "SA = b² + 2b√((b/2)² + h²)"}</p>
              </div>
            </form>
          </div>

          {/* CYLINDER */}
          <div className="calc-box" id="cylinder">
            <h1>Cylinder Surface Area</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Base Radius</label>
              <input type="number" placeholder="Enter Radius" value={cylRadius} onChange={handleChange(setCylRadius)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={cylHeight} onChange={handleChange(setCylHeight)} />

              <div className="calc-actions">
                <button type="button" onClick={calculateCylinder}>Calculate</button>
                <button className="reset-btn" type="button" onClick={() => resetInputs("Cylinder")}>Reset</button>
              </div>

              <div className="solution">
                <p><strong>Result:</strong> {cylResult}</p>
                <p><strong>Formula:</strong> {cylFormulaText || "SA = 2πr(h + r)"}</p>
              </div>
            </form>
          </div>
        </section>

        {/* HISTORY */}
        <section id="history" className="history">
          <h2>Calculation History</h2>

          <div className="history-controls">
            <button onClick={copyHistory}>Copy</button>
            <button onClick={exportHistory}>Export</button>
            <button onClick={clearHistory}>Clear</button>
          </div>

          <div className="history-list">
            {visibleHistory.length === 0 ? (
              <p>No history yet.</p>
            ) : (
              <ul>
                {visibleHistory.map((h, i) => (
                  <li key={i} className="history-item">
                    <span>{h.shape} {h.result}</span> {h.inputs} <em>{h.date}</em>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
