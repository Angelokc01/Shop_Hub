"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "@/types/producto";

interface ValorCarrito {
  items: ItemCarrito[];
  totalArticulos: number;
  totalPagar: number;
  agregarAlCarrito: (producto: Producto) => void;
  aumentarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
}

const CarritoContext = createContext<ValorCarrito | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  // el unico estado es la lista de items, los totales se sacan de aca
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

  function aumentarCantidad(id: number) {
    setItems((anteriores) =>
      anteriores.map((item) =>
        item.producto.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  }

  function disminuirCantidad(id: number) {
    setItems((anteriores) =>
      anteriores
        .map((item) =>
          item.producto.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        // si llego a 0 lo saco del carrito
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(id: number) {
    setItems((anteriores) => anteriores.filter((item) => item.producto.id !== id));
  }

  function vaciarCarrito() {
    setItems([  ]);
  }

  // estos no son estados, se calculan cada vez que cambia items
  const totalArticulos = items.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPagar = items.reduce(
    (suma,    item) => suma + item.producto.price * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        items,
        totalArticulos,
        totalPagar,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
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
