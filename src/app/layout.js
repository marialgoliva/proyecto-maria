import NavbarAdmin from "@/components/navBar/NavbarAdmin";
import Navbar from "../components/navbar/Navbar";

export const metadata = {
  title: "Mi tienda online",
  description: "Descubre productos hechos a mano para el día a día",
};

export default function Root({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <NavbarAdmin />
        {children}
      </body>
    </html>
  );
}
