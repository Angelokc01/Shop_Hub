"use client";

import { useCarrito } from "@/context/CarritoContext";

interface Props { 
  id: number ;
}

export default function BotonEliminar({ id }: Props) {
  const {  eliminarDelCarrito } = useCarrito();

  return (
    <button
      type="button"
      onClick={() => eliminarDelCarrito(id)}
      className="text-sm text-red-600 hover:underline cursor-pointer"
    
    
    >
      Eliminar
    </button>
  );
}
