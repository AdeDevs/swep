"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(false)
  const toggleWelcome = () => {
    setWelcomeMessage(!welcomeMessage)
  }

  // Read from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored !== null) {
      setActiveTheme(stored === "true");
    }
  }, []);

  // Write to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem("theme", activeTheme.toString());
  }, [activeTheme]);

  const toggleTheme = () => setActiveTheme(prev => !prev);

  const [activeMenu, setActiveMenu] = useState(false);
  const toggleMenu = () => setActiveMenu(!activeMenu);

  // ----------------------------
  // Input states
  // ----------------------------
  // Cone
  const [coneRadius, setConeRadius] = useState("");
  const [coneHeight, setConeHeight] = useState("");
  const [coneSlant, setConeSlant] = useState("");
  const [useSlant, setUseSlant] = useState(false);

  // Pyramid
  const [pyramidBase, setPyramidBase] = useState("");
  const [pyramidHeight, setPyramidHeight] = useState("");

  // Cylinder
  const [cylRadius, setCylRadius] = useState("");
  const [cylHeight, setCylHeight] = useState("");

  // ----------------------------
  // Helpers
  // ----------------------------
  const handleChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === "") {
      setter("");
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 0) {
        setter(value);
      }
    }
  };

  const parseNum = (v) => {
    if (v === "" || v === null) return NaN;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : NaN;
  };

  // ----------------------------
  // Calculations
  // ----------------------------
  const rCone = parseNum(coneRadius);
  const hCone = parseNum(coneHeight);
  const lCone = useSlant
    ? parseNum(coneSlant)
    : Math.sqrt(rCone * rCone + hCone * hCone);

  const coneArea =
    Number.isFinite(rCone) && Number.isFinite(lCone)
      ? Math.PI * rCone * (lCone + rCone)
      : NaN;

  const rCyl = parseNum(cylRadius);
  const hCyl = parseNum(cylHeight);
  const cylinderArea =
    Number.isFinite(rCyl) && Number.isFinite(hCyl)
      ? 2 * Math.PI * rCyl * (hCyl + rCyl)
      : NaN;

  const bPyr = parseNum(pyramidBase);
  const hPyr = parseNum(pyramidHeight);
  const pyramidArea =
    Number.isFinite(bPyr) && Number.isFinite(hPyr)
      ? bPyr * bPyr +
        2 * bPyr * Math.sqrt((bPyr / 2) * (bPyr / 2) + hPyr * hPyr)
      : NaN;

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className={`parent ${activeTheme ? "theme" : ""}`}>
      <div className={`msg ${welcomeMessage ? "close" : ""}`}>
        <h1>This calculator was built by <a href="https://iamadedevs.vercel.app/" target="_blank">AdeDevs</a></h1>
        <button onClick={toggleWelcome}>Open</button>
      </div>
      <nav className="navbar">
        <h1 className="logo">Surface Area Calculator</h1>
        <ul className="desk-nav">
          <li><a href="#cone">Cone Surface Area</a></li>
          <li><a href="#pyramid">Square Pyramid Surface Area</a></li>
          <li><a href="#cylinder">Cylinder Surface Area</a></li>
          <button onClick={toggleTheme} className="toggle">
            <ion-icon name="contrast"></ion-icon>
          </button>
          <button onClick={toggleMenu} className="menu">
            <ion-icon name="menu"></ion-icon>
          </button>
        </ul>
        <ul className={`mobile-nav ${activeMenu ? "active" : ""}`}>
          <button onClick={toggleMenu} className="menu">
            <ion-icon name="menu"></ion-icon>
          </button>
          <li><a onClick={toggleMenu} href="#cone">Cone Surface Area</a></li>
          <li><a onClick={toggleMenu} href="#pyramid">Square Pyramid Surface Area</a></li>
          <li><a onClick={toggleMenu} href="#cylinder">Cylinder Surface Area</a></li>
        </ul>
      </nav>
      <div className={`overlay ${activeMenu ? "active" : ""}`} onClick={toggleMenu}></div>

      <main className="home">
        <h1>Surface Area Calculator</h1>
        <p>
          Interactive tool to compute the total surface area of cones, pyramids, and cylinders. Enter the dimensions and see real-time calculations with formulas.
        </p>

        <section className="calculators">
          {/* Cone */}
          <div className="calc-box" id="cone">
            <h1>Cone Surface Area</h1>
            <p>Calculate the total surface area of a cone</p>
            <form>
              <label>Base Radius</label>
              <input type="number" placeholder="Enter Radius" value={coneRadius} onChange={handleChange(setConeRadius)} />

              <div className="cone-toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={useSlant}
                    onChange={() => setUseSlant(!useSlant)}
                  />
                  &nbsp; I will provide slant height directly
                </label>
              </div>

              {!useSlant && (
                <>
                  <label>Height</label>
                  <input
                    type="number"
                    placeholder="Enter Height"
                    value={coneHeight}
                    onChange={handleChange(setConeHeight)}
                  />
                </>
              )}

              {useSlant && (
                <>
                  <label>Slant Height</label>
                  <input
                    type="number"
                    placeholder="Enter Slant Height"
                    value={coneSlant}
                    onChange={handleChange(setConeSlant)}
                  />
                </>
              )}

              <div className="solution">
                <p>
                  Result:{" "}
                  {Number.isFinite(coneArea) ? coneArea.toFixed(2) : "—"}
                </p>
                <h3> Formula: SA = πr(l + r), l = √(r² + h²) </h3>
              </div>
            </form>
          </div>

          {/* Pyramid */}
          <div className="calc-box" id="pyramid">
            <h1>Square Pyramid Surface Area</h1>
            <p>Calculate the total surface area of a square pyramid</p>
            <form>
              <label>Base Side Length</label>
              <input type="number" placeholder="Enter Base Side" value={pyramidBase} onChange={handleChange(setPyramidBase)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={pyramidHeight} onChange={handleChange(setPyramidHeight)} />
              <div className="solution">
                <p>
                  Result:{" "}
                  {Number.isFinite(pyramidArea) ? pyramidArea.toFixed(2) : "—"}
                </p>
                <h3> Formula: SA = b² + 2b√((b/2)² + h²) </h3>
              </div>
            </form>
          </div>

          {/* Cylinder */}
          <div className="calc-box" id="cylinder">
            <h1>Cylinder Surface Area</h1>
            <p>Calculate the total surface area of a cylinder</p>
            <form>
              <label>Base Radius</label>
              <input type="number" placeholder="Enter Radius" value={cylRadius} onChange={handleChange(setCylRadius)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={cylHeight} onChange={handleChange(setCylHeight)} />
              <div className="solution">
                <p>
                  Result:{" "}
                  {Number.isFinite(cylinderArea) ? cylinderArea.toFixed(2) : "—"}
                </p>
                <h3> Formula: SA = 2πr(h + r) </h3>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}