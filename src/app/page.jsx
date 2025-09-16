"use client"
import { useState } from "react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState()
  const toggleTheme = () => {
    setActiveTheme(!activeTheme)
  }
  const [activeMenu, setActiveMenu] = useState()
  const toggleMenu = () => {
    setActiveMenu(!activeMenu)
  }

  const [coneRadius, setConeRadius] = useState("");
  const [coneHeight, setConeHeight] = useState("");

  // Pyramid states
  const [pyramidBase, setPyramidBase] = useState("");
  const [pyramidHeight, setPyramidHeight] = useState("");

  // Cylinder states
  const [cylRadius, setCylRadius] = useState("");
  const [cylHeight, setCylHeight] = useState("");

  const handleChange = (setter) => (e) => {
    const value = e.target.value;
  
    if (value === "") {
      setter(""); // allow clearing input
    } else {
      const num = Number(value);
      if (num >= 0) {
        setter(value); // keep as string
      }
    }
  };

  // --- Formulas ---
  // Cone surface area = πr(l + r) where l = slant height = √(r² + h²)
  const coneArea =
    coneRadius && coneHeight
      ? Math.PI * coneRadius * (Math.sqrt(coneRadius ** 2 + coneHeight ** 2) + coneRadius)
      : 0;

  // Square Pyramid surface area = b² + 2b * slant height
  // slant height = √((b/2)² + h²)
  const pyramidArea =
    pyramidBase && pyramidHeight
      ? pyramidBase ** 2 + 2 * pyramidBase * Math.sqrt((pyramidBase / 2) ** 2 + pyramidHeight ** 2)
      : 0;

  // Cylinder surface area = 2πr(h + r)
  const cylinderArea =
    cylRadius && cylHeight ? 2 * Math.PI * cylRadius * (cylHeight + cylRadius) : 0;



  return (
    <div className={`parent ${activeTheme ? "theme" : ""}`}>
      <nav className="navbar">
        <h1 className="logo">Surface Area Calculator</h1>
        <ul className="desk-nav">
          <li><a href="#cone">Cone Surface Area</a></li>
          <li><a href="#pyramid">Square Pyramid Surface Area</a></li>
          <li><a href="#cylinder">Cylinder Surface Area</a></li>
          <button onClick={toggleTheme} className="toggle"><ion-icon name="contrast"></ion-icon></button>
          <button onClick={toggleMenu} className="menu"><ion-icon name="menu"></ion-icon></button>
        </ul>
        <ul className={`mobile-nav ${activeMenu ? "active" : ""}`}>
          <button onClick={toggleMenu} className="menu"><ion-icon name="menu"></ion-icon></button>
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
          <div className="calc-box" id="cone">
            <h1>Cone Surface Area</h1>
            <p>Calculate the total surface area of a cone</p>
            <form>
              <label>Base Radius</label>
              <input type="number" placeholder="Enter Radius" value={coneRadius} onChange={handleChange(setConeRadius)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={coneHeight} onChange={handleChange(setConeHeight)} />
              <div className="solution">
                <p> Result: {coneArea.toFixed(2)} </p>
                <h3> Formula: SA = πr(l + r), l = √(r² + h²) </h3>
              </div>
            </form>
          </div>

          <div className="calc-box" id="pyramid">
            <h1>Square Pyramid Surface Area</h1>
            <p>Calculate the total surface area of a square pyramid</p>
            <form>
              <label>Base Side Length</label>
              <input type="number" placeholder="Enter Base Side" value={pyramidBase} onChange={handleChange(setPyramidBase)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={pyramidHeight} onChange={handleChange(setPyramidHeight)} />
              <div className="solution">
                <p> Result: {pyramidArea.toFixed(2)} </p>
                <h3> Formula: SA = b² + 2b√((b/2)² + h²) </h3>
              </div>
            </form>
          </div>

          <div className="calc-box" id="cylinder">
            <h1>Cylinder Surface Area</h1>
            <p>Calculate the total surface area of a cylinder</p>
            <form>
              <label>Base Radius</label>
              <input type="number" placeholder="Enter Radius" value={cylRadius} onChange={handleChange(setCylRadius)} />
              <label>Height</label>
              <input type="number" placeholder="Enter Height" value={cylHeight} onChange={handleChange(setCylHeight)} />
              <div className="solution">
                <p> Result: {cylinderArea.toFixed(2)} </p>
                <h3> Formula: SA = 2πr(h + r) </h3>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
