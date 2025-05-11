import { ReactNode, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <aside
        className={`
          fixed lg:static top-0 left-0 z-40 w-64 bg-gradient-to-b from-foreground via-foreground to-background text-white p-6 space-y-6 shadow-lg
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between lg:hidden">
          <h2 className="text-2xl font-bold tracking-wide">Almeida Pinturas</h2>
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>

        <h2 className="hidden lg:block text-2xl font-bold tracking-wide">
          Almeida Pinturas
        </h2>
        <nav className="flex flex-col gap-2">
          <Link
            href="/users"
            className="px-4 py-2 rounded-md hover:bg-white hover:text-blue-800 transition"
          >
            Funcionários
          </Link>
          <Link
            href="/calculate"
            className="px-4 py-2 rounded-md hover:bg-white hover:text-blue-800 transition"
          >
            Calcular Medidas
          </Link>
        </nav>
      </aside>

      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-foreground text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={24} />
      </button>

      <main className="flex-1 bg-gradient-to-br from-gray-100 to-white p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
