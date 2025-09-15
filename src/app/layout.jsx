import "./styles/reset.css"
import "./styles/index.css"

export const metadata = {
  title: "Surface Area Calculator",
  description: "A surface area calculator built by GROUP D, Computer Science Class 27",
  icons: {
    icon: "./calculator.png",
    shortcut: "./preview.png",
    apple: "./calculator.png"
  },
  images: [
    {
      url: "./preview.png",
      width: 1200,
      height: 630,
      alt: "Preview of the Surface Area Calculator app",
    },
  ],
  keywords: ["geometry", "surface area", "cone", "pyramid", "cylinder"],
  openGraph: {
    title: "Surface Area Calculator",
    description: "Interactive calculator for cones, pyramids, and cylinders.",
    url: "https://groupdcalculator.vercel.app/",
    siteName: "Math Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surface Area Calculator",
    description: "Interactive calculator for cones, pyramids, and cylinders.",
    images: ["./preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <script defer type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script defer noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
