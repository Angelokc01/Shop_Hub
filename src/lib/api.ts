import type { DetalleProducto, RespuestaProductos } from "@/types/producto";

const URL_API = "https://dummyjson.com";

// trae los 8 productos del catalogo
export async function obtenerProductos(): Promise<RespuestaProductos> {
  const respuesta = await fetch(
    `${URL_API}/products?limit=8&select=id,title,price,category,thumbnail,stock`
  );

  if (!respuesta.ok) {
    throw new Error("Error al cargar los productos");
  }

  return respuesta.json();
}

// trae un producto por su id, si no existe devuelve null
export async function obtenerProducto(id: string): Promise<DetalleProducto | null> {
  const respuesta = await fetch(`${URL_API}/products/${id}`);

  if (respuesta.status === 404) {
    return null;
  }
  if (!respuesta.ok) {
    throw new Error("Error al cargar el producto");
  }

  return respuesta.json();
}
