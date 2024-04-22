import { Cormorant_Garamond, Eczar } from "next/font/google";
import "./globals.css";

const eczar = Eczar({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eczar",
});
const cormorant_garamond = Cormorant_Garamond({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant_garamond",
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={eczar.variable + cormorant_garamond.variable}>
        {children}
      </body>
    </html>
  );
}
