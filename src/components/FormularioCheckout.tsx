"use client";

import { useState, type ChangeEvent, type FocusEvent, type SubmitEvent } from "react";
import { useCarrito } from "@/context/CarritoContext";
import { crearPedido } from "@/lib/api";

interface Valores {
  nombre:  string;
  correo: string;
  metodoPago: string;
  terminos: boolean;
}

type Errores  = Partial<Record<keyof Valores, string>>;
type Tocados = Partial<Record<keyof Valores, boolean>>;

interface  PedidoConfirmado {
  numero: number;
  nombre: string;
  correo: string;
  total: number;
}

const valoresIniciales: Valores = {
  nombre:  "",
  correo: "",
  metodoPago: "",
  terminos: false,
};

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// revisa todos los campos y devuelve los mensajes de error
function validar(valores: Valores): Errores {
  const errores: Errores = {};

  if (valores.nombre.trim().length < 5) {
    errores.nombre = "El nombre debe tener mínimo 5 caracteres";
  }
  if (!REGEX_CORREO.test(valores.correo.trim())) {
    errores.correo = "Ingresa un correo válido (ej: nombre@correo.com)";
  }
  if (valores.metodoPago === "") {
    errores.metodoPago = "Selecciona un método de pago";
  }
  if (!valores.terminos) {
    errores.terminos = "Debes aceptar los términos y condiciones";
  }

  return errores;
}

export default function FormularioCheckout() {
  const { items, totalPagar, vaciarCarrito } = useCarrito();

  const [valores, setValores] = useState<Valores>(valoresIniciales);
  const [tocados, setTocados] = useState<Tocados>({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [pedido, setPedido] = useState<PedidoConfirmado | null>(null);

  // los errores salen de los valores, por eso no los guardo en otro estado
  const errores = validar(valores);
  const formularioValido = Object.keys(errores).length === 0;
  const carritoVacio = items.length === 0;

  // un solo handler para todos los campos usando el name
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    // el checkbox no usa value sino checked
    const nuevoValor =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;

    setValores((anteriores) => ({ ...anteriores, [name]: nuevoValor }));
  }

  // cuando el usuario sale del campo lo marco como tocado para mostrar el error
  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTocados((anteriores) => ({ ...anteriores, [name]: true }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // para que no se recargue la pagina

    if (!formularioValido || carritoVacio || enviando) {
      return;
    }

    setEnviando(true);
    setErrorEnvio("");

    try {
      const respuesta = await crearPedido(items);

      setPedido({
        numero: respuesta.id,
        nombre: valores.nombre.trim(),
        correo: valores.correo.trim(),
        total: totalPagar,
      });
      vaciarCarrito();
      setValores(valoresIniciales);
      setTocados({});
    } catch {
      setErrorEnvio("Hubo un problema al procesar el pedido, intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  const estiloCampo = "w-full border rounded-lg px-3 py-2 mt-1 bg-white";

  function claseCampo(campo: keyof Valores) {
    return tocados[campo] && errores[campo]
      ? `${estiloCampo} border-red-500`
      : `${estiloCampo} border-gray-300`;
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos de facturación</h2>

      {pedido && (
        <div role="status" className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-4 mt-4">
          <p className="font-semibold">¡Pedido #{pedido.numero} confirmado!</p>
          <p className="text-sm mt-1">
            Gracias {pedido.nombre}, enviamos la factura por ${pedido.total.toFixed(2)} a{" "}
            {pedido.correo}.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-4">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={valores.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(tocados.nombre && errores.nombre)}
            className={claseCampo("nombre")}
          />
          {tocados.nombre && errores.nombre && (
            <p className="text-sm text-red-600 mt-1">{errores.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="correo" className="text-sm font-medium text-gray-700">
            Correo de facturación
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={valores.correo}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(tocados.correo && errores.correo)}
            className={claseCampo("correo")}
          />
          {tocados.correo && errores.correo && (
            <p className="text-sm text-red-600 mt-1">{errores.correo}</p>
          )}
        </div>

        <div>
          <label htmlFor="metodoPago" className="text-sm font-medium text-gray-700">
            Método de pago
          </label>
          <select
            id="metodoPago"
            name="metodoPago"
            value={valores.metodoPago}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(tocados.metodoPago && errores.metodoPago)}
            className={claseCampo("metodoPago")}
          >
            <option value="">Selecciona una opción</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="pse">PSE</option>
            <option value="efectivo">Efectivo contra entrega</option>
          </select>
          {tocados.metodoPago && errores.metodoPago && (
            <p className="text-sm text-red-600 mt-1">{errores.metodoPago}</p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            name="terminos"
            type="checkbox"
            checked={valores.terminos}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Acepto los términos y condiciones
        </label>

        {errorEnvio && <p className="text-sm text-red-600">{errorEnvio}</p>}

        <button
          type="submit"
          disabled={!formularioValido || carritoVacio || enviando}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-6 py-3 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {enviando ? "Procesando pedido..." : "Confirmar pedido"}
        </button>

        {carritoVacio && !pedido && (
          <p className="text-sm text-gray-500">Agrega productos al carrito para poder confirmar.</p>
        )}
      </form>
    </section>
  );
}
