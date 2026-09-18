# ShopHub

Tienda online hecha con Next.js para el preparcial de Web.

Usa la API de [DummyJSON](https://dummyjson.com) para traer los productos.

## Que tiene

- Catálogo con 8 productos (`/`)
- Página de detalle de cada producto (`/productos/[id]`)
- Carrito con contador en la barra de arriba (usando Context)
- Estilos con Tailwind

## Como correrlo

```bash
npm install
npm run dev
```

Y abrir [http://localhost:3000](http://localhost:3000)

## Estructura

- `src/app` → páginas (inicio, detalle y loading)
- `src/components` → Navbar, TarjetaProducto, BotonAgregar, ContadorCarrito
- `src/context` → contexto del carrito
- `src/lib/api.ts` → funciones para llamar a la API
- `src/types` → interfaces de TypeScript
