"use client";

import Image from "next/image";
import Link from "next/link";
import BotonEliminar from "./BotonEliminar";
import { useCarrito } from "@/context/CarritoContext";

export default function ResumenCompra() {
  const { items, totalArticulos, totalPagar, aumentarCantidad, disminuirCantidad, vaciarCarrito } =
    useCarrito();

  if (items.length === 0) {
    return (
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">Resumen de compra</h2>
        <p className="text-gray-500 mt-4">Tu carrito está vacío.</p>
        <Link href="/" className="inline-block text-indigo-600 hover:underline mt-2">
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Resumen de compra</h2>
        <button
          type="button"
          onClick={vaciarCarrito}
          className="text-sm text-gray-500 hover:text-red-600 cursor-pointer"
        >
          Vaciar carrito
        </button>
      </header>

      <ul className="divide-y divide-gray-200 mt-4">
        {items.map(({ producto, cantidad }) => (
          <li key={producto.id} className="flex gap-4 py-4">
            <Image
              src={producto.thumbnail}
              alt={producto.title}
              width={80}
              height={80}
              className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
            />

            <div className="flex-1">
              <p className="font-medium text-gray-900">{producto.title}</p>
              <p className="text-sm text-gray-500">${producto.price} c/u</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => disminuirCantidad(producto.id)}
                  aria-label={`Quitar una unidad de ${producto.title}`}
                  className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="w-6 text-center">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => aumentarCantidad(producto.id)}
                  aria-label={`Agregar una unidad de ${producto.title}`}
                  className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
                <BotonEliminar id={producto.id} />
              </div>
            </div>

            {/* subtotal de cada producto */}
            <p className="font-semibold text-gray-900">
              ${(producto.price * cantidad).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <footer className="border-t border-gray-200 pt-4 mt-2">
        <p className="flex justify-between text-gray-500">
          <span>Artículos</span>
          <span>{totalArticulos}</span>
        </p>
        <p className="flex justify-between text-xl font-bold text-gray-900 mt-1">
          <span>Total a pagar</span>
          <span>${totalPagar.toFixed(2)}</span>
        </p>
      </footer>
    </section>
  );
}
