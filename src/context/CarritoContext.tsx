"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "@/types/producto";

interface ValorCarrito {
  items: ItemCarrito[];
  agregarAlCarrito: (producto: Producto) => void;
}

const CarritoContext = createContext<ValorCarrito | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  function agregarAlCarrito(producto: Producto) {
    setItems((anteriores) => {
      const yaEsta = anteriores.find((item) => item.producto.id === producto.id);

      // si ya estaba en el carrito solo le sumo 1 a la cantidad
      if (yaEsta) {
        return anteriores.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // si no estaba lo agrego con cantidad 1
      return [...anteriores, { producto: producto, cantidad: 1 }];
    });
  }

  return (
    <CarritoContext.Provider value={{ items, agregarAlCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

// hook para usar el carrito en cualquier componente
export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error("useCarrito tiene que usarse dentro de CarritoProvider");
  }
  return contexto;
}
