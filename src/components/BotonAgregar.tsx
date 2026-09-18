"use client";

import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import type { Producto } from "@/types/producto";

interface Props {
  producto: Producto;
  grande?: boolean;
}

export default function BotonAgregar({ producto, grande = false }: Props) {
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  function handleClick() {
    agregarAlCarrito(producto);
    setAgregado(true);
  }

  // el boton grande es para la pagina de detalle
  const tamano = grande ? "px-6 py-3" : "px-3 py-1.5 text-sm";
  const color = agregado ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-white font-medium rounded-lg cursor-pointer ${tamano} ${color}`}
    >
      {agregado ? "✓ Agregado" : "Agregar al carrito"}
    </button>
  );
}
