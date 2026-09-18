# ShopHub

Tienda online hecha con Next.js para el preparcial y parcial de Web.

Usa la API de [DummyJSON](https://dummyjson.com) para traer los productos.

## Que tiene

- Catálogo con 8 productos (`/`)
- Página de detalle de cada producto (`/productos/[id]`)
- Carrito con contador en la barra de arriba (usando Context)
- Carrito con cantidades: sumar, restar, eliminar productos y vaciarlo
- Página de checkout (`/checkout`) con resumen de compra y formulario de facturación
- Estilos con Tailwind

## Como correrlo

```bash
npm install
npm run dev
```

Y abrir [http://localhost:3000](http://localhost:3000)

## Estructura

- `src/app` → paginas (inicio, detalle, checkout y loading)
- `src/components` → Navbar, TarjetaProducto, BotonAgregar, BotonEliminar, ContadorCarrito, ResumenCompra, FormularioCheckout
- `src/context` → contexto del carrito
- `src/lib/api.ts` → funciones para llamar a la API

## Parte 3 Parcial



### Punto 1: Evolucion del Contexto

El contexto del carrito (el CartContext del enunciado, en mi proyecto se llama `CarritoContext`) está en `src/context/CarritoContext.tsx`.


**Cómo cambio el modeo de datos:** en el preparcial el carrito ya guardaba cada producto con su cantidad (`ItemCarrito = { producto, cantidad }`), pero lo único que se podía hacer era agregar. El contexto solo exponía `items` y `agregarAlCarrito`, y el conteo de unidades lo hacía el componente `ContadorCarrito` con un `for`. Para el parcial dejé el mismo modelo ( un solo arreglo de items agrupados por producto, cada uno con su `cantidad`) y le agregué las operaciones que faltaban:


- `agregarAlCarrito(producto)`: si el producto ya está le suma 1, si no lo agrega con cantidad 1.
- `aumentarCantidad(id)` y `disminuirCantidad(id)`: suman o restan una unidad. Si al restar la cantidad queda en 0, el item se quita del carrito solo.
- `eliminarDelCarrito(id)`: quita el producto sin importar cuántas unidades tenga.
- `vaciarCarrito()`: deja el carrito como al inicio (`[]`).
- `totalArticulos` y `totalPagar`: los totales ya calculados (ver punto 2).

Así los componentes (contador, resumen, formulario) solo le piden al contexto lo que necesitan y no tienen que hacer cuentas ni pasarse props entre ellos.

**Inmutabilidad:** nunca modifico el arreglo ni los objetos que ya están en el estado (nada de `push`, `splice` o `item.cantidad++`). Cada operación crea un arreglo nuevo:

- Para agregar un producto nuevo uso spread: `[...anteriores, { producto, cantidad: 1 }]`.
- Para cambiar una cantidad uso `map` y al item que cambia le creo un objeto nuevo con `{ ...item, cantidad: item.cantidad + 1 }`. Los demás items se devuelven igual.
- Para eliminar uso `filter`, que también devuelve un arreglo nuevo. En `disminuirCantida` encadeno `map` + `filter` para bajar la cantidad y sacar los que quedaron en 0 en una sola actualización.
- Todos los `setItems` usan la forma de función (`setItems((anteriores) => ...)`) para trabajar siempre con el estado más reciente, por ejemplo si se hacen varios clics seguidos.
teng

### Punto 2: Cálculo de Totales

El único estado del contexto es `items`. El total a pagar y el número de artículos **no** los guardo en otro `useState`, sino que se calculan en cada render del Provider a partir de `items` con `reduce`:

```ts
const totalArticulos = items.reduce((suma, item) => suma + item.cantidad, 0);
const totalPagar = items.reduce((suma, item) => suma + item.producto.price * item.cantidad, 0);
```

Y se pasan en el `value` del Provider junto con las funciones.

Lo hice así porque son datos derivados: siempre se pueden sacar de `items`. Si los guardara en estados aparte tendría que acordarme de actualizarlos en cada operación (agregar, restar, eliminar, vaciar) y si se me olvida en alguna, el total quedaría desincronizado con los productos. Calculandolos hay una sola fuente de verdad. Como `items` cambia con `setItems`, el Provider se vuelve a renderizar y los totales se recalculan solos, así que el contador de la barra de arriba y el resumen del checkout siempre muestran lo mismo.

El subtotal de cada producto en el resumen también es calculado (`producto.price * cantidad`) y los precios se muestran con `toFixed(2)` para que no salgan decimales raros de JavaScript.

### Punto 3:  Arquitectura del Formulario

La página `/checkout` (`src/app/checkout/page.tsx`)

