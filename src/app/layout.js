import Navbar from "../components/navbar/Navbar";
import Providers from "./Providers";
import { getServerSession } from "next-auth";
import Head from "next/head";
import NavbarAdmin from "@/components/navBar/NavbarAdmin";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import "@/styles/global.css";

// Metadata para el sitio web
export const metadata = {
  title: "Mi tienda online",
  description: "Descubre productos hechos a mano para el día a día",
};

/**
 * Componente RootLayout que envuelve todo el contenido de la aplicación.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos.
 * @returns {JSX.Element} El componente RootLayout que envuelve todo el contenido de la aplicación.
 */
export default async function RootLayout({ children }) {
  // Obtenemos la sesión del servidor
  const session = await getServerSession(authOptions);

  // Devolvemos el componente RootLayout
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Toaster position="top right" toastOptions={{ duration: 3000 }} />
        <CartProvider>
          <Providers>
            <Navbar />
            {session?.user.role && (
              <p className="text-end m-3">
                Has iniciado sesion como {session.user.email}
              </p>
            )}
            {session?.user.role == "admin" && <NavbarAdmin />}
            {children}
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
