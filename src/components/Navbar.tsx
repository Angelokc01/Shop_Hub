import Link from "next/link";
import ContadorCarrito from "./ContadorCarrito";

export default function  Navbar() {
  return (
    <header className= " bg-indigo-700 text-white shadow">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/"  className="text-2xl font-bold">
          ShopHub
        </Link>
        <div className="  flex items-center gap-5"  >
          <Link href="/"  className="hover:underline">
            Catálogo 
          </Link>
          <Link href="/checkout" className="hover:underline">
            Checkout
          </Link>
          {/* el contador tambien lleva al checkout */}
          <Link href="/checkout">
            <ContadorCarrito />
          </Link>
        </div>
      </nav>
    </header>
  );
}
