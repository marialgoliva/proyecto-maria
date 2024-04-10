import NavbarAdmin from "@/components/navBar/NavbarAdmin";
import Navbar from "../components/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./Providers";

export const metadata = {
  title: "Mi tienda online",
  description: "Descubre productos hechos a mano para el día a día",
};

const session = await getServerSession(authOptions);
console.log(session);

export default async function Root({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {session?.user && <NavbarAdmin />}
        {session?.user && (
          <p className="m-2"> Has iniciado sesión como {session.user.email}</p>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
