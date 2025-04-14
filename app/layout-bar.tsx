// components/Layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gradient-to-b from-foreground via-foreground to-background text-white flex flex-col p-6 space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold tracking-wide">Almeida Pinturas</h2>
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

      <main className="flex-1 bg-gradient-to-br from-gray-100 to-white p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
