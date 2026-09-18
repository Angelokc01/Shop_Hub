import type {
  DetalleProducto,
  ItemCarrito,
  RespuestaPedido,
  RespuestaProductos,
} from "@/types/producto";

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

// manda el pedido a dummyjson (/carts/add), la API lo simula y no lo guarda de verdad
export async function crearPedido(items: ItemCarrito[]): Promise<RespuestaPedido> {
  const respuesta = await fetch(`${URL_API}/carts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: items.map((item) => ({ id: item.producto.id, quantity: item.cantidad })),
    }),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo procesar el pedido");
  }

  return respuesta.json();
}
