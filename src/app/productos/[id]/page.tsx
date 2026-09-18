import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotonAgregar from "@/components/BotonAgregar";
import { obtenerProducto } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DetalleProducto({ params }: Props) {
  const { id } = await params;
  const producto = await obtenerProducto(id);

  // si el id no existe mostramos la pagina 404
  if (!producto) {
    notFound();
  }

  return (
    <section>
      <Link href="/" className="text-indigo-600 hover:underline">
        ← Volver al catálogo
      </Link>

      <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-4 flex flex-col md:flex-row gap-8">
        <Image
          src={producto.thumbnail}
          alt={producto.title}
          width={500}
          height={500}
          loading="eager"
          className="w-full md:w-1/2 h-80 object-contain bg-gray-50 rounded-lg"
        />

        <section className="md:w-1/2">
          <p className="text-xs text-indigo-600 font-semibold uppercase">
            {producto.category} {producto.brand && `/ ${producto.brand}`}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">{producto.title}</h1>
          <p className="text-amber-600 mt-1">★ {producto.rating}</p>

          <p className="text-3xl font-bold text-gray-900 mt-4">${producto.price}</p>
          <p className={producto.stock < 10 ? "text-sm text-red-600" : "text-sm text-green-600"}>
            Stock disponible: {producto.stock}
          </p>

          <p className="my-6 text-gray-700">{producto.description}</p>

          <BotonAgregar producto={producto} grande />
        </section>
      </article>
    </section>
  );
}
