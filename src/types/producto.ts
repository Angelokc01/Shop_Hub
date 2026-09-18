// los nombres de los campos estan en ingles porque asi los devuelve la API de dummyjson

// producto como viene en la lista (solo pedimos algunos campos con select)
export interface Producto {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

// producto completo, del endpoint /products/{id}
export interface DetalleProducto extends Producto {
  description: string;
  brand?: string;
  images: string[];
  rating: number;
}

export interface RespuestaProductos {
  products: Producto[];
  total: number;
  skip: number;
  limit: number;
}

// lo que se guarda en el carrito
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
