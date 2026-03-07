import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
// 1. Importamos el proveedor del carrito
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Quesería La Artesana | Quesos Premium",
  description: "Selección de quesos artesanales y gourmet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        {/* 2. Envolvemos todo el contenido con CartProvider */}
        <CartProvider>
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

