import Link from "next/link";
import "@/styles/global.css";
import styles from "../Navbar/styles.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "../buttons/SignOutButton";

import ButtonCart from "../cart/ButtonCart";

const linksSub = [
  { name: "Registrarse", href: "/auth/register" },
  { name: "Iniciar sesión", href: "/auth/login" },
];

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.navHeader}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.linkNav}>
          <h1 className="display-5"> Moon Design - Tienda Online</h1>
        </Link>

        <nav className="d-flex column align-items-center gap-5">
          <div className="d-flex flex-row gap-3 fs-4">
            <div>
              <Link href="/productos" className={styles.linkNav}>
                Productos
              </Link>
            </div>
            <div>
              <Link href="/about" className={styles.linkNav}>
                About
              </Link>
            </div>
            <div>
              <Link href="/contacto" className={styles.linkNav}>
                Contacto
              </Link>
            </div>
            <ButtonCart />
          </div>
          <div className="d-flex flex-row gap-2">
            {linksSub.map((link, id) => (
              <div key={id} className="border rounded px-2 py-1 fs-5">
                {/* {pathname == link.href ? ( */}
                {/* <Link className={styles.linkNav} href={link.href}>
                    {link.name}
                  </Link> */}
                {/* ) : ( */}
                <Link href={link.href} className={styles.linkNav}>
                  {link.name}
                </Link>
                {/* )} */}
              </div>
            ))}
          </div>
          {session && <SignOutButton />}
        </nav>
      </div>
    </header>
  );
}
