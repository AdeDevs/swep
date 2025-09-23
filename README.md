# 📘 Surface Area Calculator

A **Next.js web app** for calculating the surface area of three 3D shapes:  
- **Cone**  
- **Square Pyramid**  
- **Cylinder**

The app provides formulas, real-time calculations, and a theme toggle for light/dark mode.

---

## ✨ Features
- 🧮 **Surface area calculators** for cone, pyramid, and cylinder  
- 🔄 **Real-time updates** as users type  
- 📐 **Formula display** alongside results  
- 🌗 **Dark/Light theme toggle** (saved in localStorage)  
- 📱 **Responsive navigation** with desktop & mobile menus  
- 🚫 **Input validation** (no negatives or invalid values)  

---

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/) (App Router)  
- React Hooks (`useState`, `useEffect`)  
- LocalStorage for theme persistence  
- [Ionicons](https://ionic.io/ionicons) for icons  
- CSS (custom styling)

---

## 📂 Project Structure
```bash
surface-area-calculator/
├── app/
│   └── page.js         # Main Next.js app code
├── public/             # Assets & icons
├── styles/
│   └── globals.css     # Global styling
├── package.json
└── README.md

