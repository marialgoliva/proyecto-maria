import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavbarAdmin from "@/components/navBar/NavbarAdmin";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <section>
      {/* <h2>Layout admin</h2> */}
      {/* {session?.user.role == "admin" && <NavbarAdmin />} */}
      {children}
    </section>
  );
}
