import Image from "next/image";
import Link from "next/link";
import BotonAgregar from "./BotonAgregar";
import type { Producto } from "@/types/producto";

interface Props {
  producto: Producto;
  prioridad?: boolean; // para que las imagenes de arriba carguen primero
}

export default function TarjetaProducto({ producto, prioridad = false }: Props) {
  const pocoStock = producto.stock < 10;

  return (
    <article className="w-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md p-4">
      <Image
        src={producto.thumbnail}
        alt={producto.title}
        width={300}
        height={300}
        loading={prioridad ? "eager" : "lazy"}
        className="w-full h-40 object-contain bg-gray-50 rounded-lg"
      />

      <p className="text-xs text-indigo-600 font-semibold uppercase mt-3">{producto.category}</p>
      <h2 className="text-base font-semibold text-gray-900 truncate">{producto.title}</h2>

      <p className="text-2xl font-bold text-gray-900 mt-2">${producto.price}</p>
      {/* si hay menos de 10 se muestra en rojo */}
      <p className={pocoStock ? "text-xs text-red-600" : "text-xs text-gray-500"}>
        {pocoStock ? `¡Solo quedan ${producto.stock}!` : `${producto.stock} en stock`}
      </p>

      <footer className="flex justify-between items-center mt-auto pt-4">
        <Link href={`/productos/${producto.id}`} className="text-sm text-indigo-600 hover:underline">
          Ver detalle
        </Link>
        <BotonAgregar producto={producto} />
      </footer>
    </article>
  );
}
