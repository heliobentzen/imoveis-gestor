import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imóveis Gestor - Sistema de Gestão de Imóveis",
  description: "Sistema completo para gestão de empreendimentos imobiliários, corretores e leads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
