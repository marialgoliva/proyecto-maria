import NavbarAdmin from "@/components/navBar/NavbarAdmin";
import Navbar from "../components/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions, req, res } from "./api/auth/[...nextauth]/route";
import Providers from "./Providers";

export const metadata = {
  title: "Mi tienda online",
  description: "Descubre productos hechos a mano para el día a día",
};

const getSession = async () => {
  const session = await getServerSession({ req, res, authOptions });
  return session;
};

const session = getSession();

export default async function Root({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {session?.user?.role === "admin" && <NavbarAdmin />}
        {session?.user && (
          <p className="m-2"> Has iniciado sesión como {session.user.email}</p>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
