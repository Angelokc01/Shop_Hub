import type { Metadata } from "next";
import FormularioCheckout from "@/components/FormularioCheckout";
import ResumenCompra from "@/components/ResumenCompra";

export const metadata: Metadata = {
  title: "Checkout | ShopHub",
};

export default function Checkout() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <p className="text-gray-500 mb-6">Revisa tu pedido y completa tus datos</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ResumenCompra />
        <FormularioCheckout />
      </div>
    </section>
  );
}
