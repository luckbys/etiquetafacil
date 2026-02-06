import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EtiquetaFácil - Gere etiquetas de envio em segundos",
  description: "Importe pedidos do Mercado Livre e Shopee automaticamente. Gere etiquetas em lote para Correios, Loggi, Jadlog e mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
