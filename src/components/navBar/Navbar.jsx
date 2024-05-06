import Link from "next/link";
import "@/styles/global.css";
import styles from "../Navbar/styles.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "../buttons/SignOutButton";

import ButtonCart from "../cart/ButtonCart";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.navHeader}>
      <div className={styles.navContainer}>
        <Link href="./" className={styles.logo}>
          <img src="/logo_reducido.svg" alt="Logotipo de Moon Design" />
        </Link>
        <nav className={styles.nav}>
          <div className="d-flex flex-row gap-4 me-5">
            <Link href="/auth/register" className={styles.linkNav}>
              Registrarse
            </Link>
            {session ? (
              <SignOutButton />
            ) : (
              <Link href="/auth/login" className={styles.linkNav}>
                Iniciar sesión
              </Link>
            )}
          </div>

          <div className="d-flex flex-row gap-3 fs-4 me-5">
            {/* <div>
              <Link href="/" className={styles.linkNav}>
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
            </div> */}
            <ButtonCart />
            {session?.user.email && (
              <nav className={styles.navRight}>
                <div className="d-flex flex-row gap-4 me-5">
                  <Link href="/mi-pedido" className={styles.linkNav}>
                    Mis pedidos
                  </Link>
                </div>
              </nav>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
