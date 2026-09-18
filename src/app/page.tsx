import TarjetaProducto from "@/components/TarjetaProducto";
import { obtenerProductos } from "@/lib/api";

export default async function Inicio() {
  const { products } = await obtenerProductos();

  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900">Catálogo de productos</h1>
      <p className="text-gray-500 mb-6">{products.length} productos disponibles</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((producto, i) => (
          <li key={producto.id} className="flex">
            {/* los 4 primeros son la primera fila */}
            <TarjetaProducto producto={producto} prioridad={i < 4} />
          </li>
        ))}
      </ul>
    </section>
  );
}
