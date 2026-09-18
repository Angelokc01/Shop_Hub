import Link from "next/link";
import ContadorCarrito from "./ContadorCarrito";

export default function Navbar() {
  return (
    <header className="bg-indigo-700 text-white shadow">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-bold">
          ShopHub
        </Link>
        <ContadorCarrito />
      </nav>
    </header>
  );
}
