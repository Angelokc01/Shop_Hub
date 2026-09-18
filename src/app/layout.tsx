import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CarritoProvider } from "@/context/CarritoContext";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "Tienda online hecha con Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      {/* suppressHydrationWarning porque algunas extensiones del navegador le meten atributos al body */}
      <body className="min-h-screen" suppressHydrationWarning>
        <CarritoProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto p-6">{children}</main>
        </CarritoProvider>
      </body>
    </html>
  );
}
