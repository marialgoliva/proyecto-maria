import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminPanel from "@/components/navBar/AdminPanel";

/**
 * Componente Admin que muestra el panel de administración si el usuario es un administrador.
 *
 * @returns {JSX.Element} El componente Admin que muestra el panel de administración si el usuario es un administrador.
 */
async function Admin() {
  // Obtenemos la sesión del servidor
  const session = await getServerSession(authOptions);

  // Devolvemos el componente Admin
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      {session?.user && (
        <p className="m-2"> Has iniciado sesión como {session.user.email}</p>
      )}
      {session?.user.role == "admin" && <AdminPanel />}
    </div>
  );
}

export default Admin;
