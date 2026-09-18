"use client";

import { useCarrito } from "@/context/CarritoContext";

export default function ContadorCarrito() {
  // el total de unidades ya viene calculado desde el contexto
  const { totalArticulos } = useCarrito();

  return (
    <span className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-full">
      🛒 Carrito: {totalArticulos}
    </span>
  );
}
