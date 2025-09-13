import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskManager - Gestión de Tareas Personales",
  description:
    "Aplicación web para la gestión eficiente de tareas personales con estadísticas y filtros avanzados",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AuthProvider>
          <Header />
          <main className="max-w-7xl mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
