import Navbar from "../components/navbar/Navbar";
import Providers from "./Providers";
import { getServerSession } from "next-auth";

import NavbarAdmin from "@/components/navBar/NavbarAdmin";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { CartProvider } from "@/components/cart/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Mi tienda online",
  description: "Descubre productos hechos a mano para el día a día",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Toaster position="top right" toastOptions={{ duration: 3000 }} />
        <CartProvider>
          <Navbar />
          {session?.user.role && (
            <p className="text-end m-3">
              Has iniciado sesion como {session.user.email}
            </p>
          )}
          {session?.user.role == "admin" && <NavbarAdmin />}
          <Providers>{children}</Providers>
        </CartProvider>
      </body>
    </html>
  );
}
