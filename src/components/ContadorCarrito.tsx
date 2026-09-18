"use client";

import { useCarrito } from "@/context/CarritoContext";

export default function ContadorCarrito() {
  const { items } = useCarrito();

  // cuento todas las unidades, no solo los productos diferentes
  let total = 0;
  for (const item of items) {
    total = total + item.cantidad;
  }

  return (
    <span className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-full">
      🛒 Carrito: {total}
    </span>
  );
}
