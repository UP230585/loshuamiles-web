import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/context/CartContext";
import SelectorZona from "@/components/SelectorZona";

export const metadata: Metadata = {
  title: "Quesería Los huamiles | Quesos Premium",
  description: "Selección de quesos artesanales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
           <SelectorZona />
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
