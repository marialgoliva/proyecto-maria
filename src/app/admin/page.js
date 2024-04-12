import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminPanel from "@/components/navBar/AdminPanel";

async function Admin() {
  const session = await getServerSession(authOptions);
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
