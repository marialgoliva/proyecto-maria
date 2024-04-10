import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/navBar/Navbar";
import NavbarAdmin from "@/components/navBar/NavbarAdmin";

const session = await getServerSession(authOptions);
console.log(session);

async function Test() {
  // const res = await getUserRole("admin@gmail.com");
  // console.log('Resultado: ' + res);
  return (
    <div>
      <h1>Test</h1>

      <Navbar />
      {session?.user && <NavbarAdmin />}
      {session?.user && (
        <p className="m-2"> Has iniciado sesión como {session.user.email}</p>
      )}
    </div>
  );
}

export default Test;
