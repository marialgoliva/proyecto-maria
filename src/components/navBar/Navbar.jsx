"use client";
import Link from "next/link";
import "@/styles/global.css";
import { usePathname } from "next/navigation";
import styles from "../Navbar/styles.module.css";

const links = [
  { name: "Home", href: "/" },
  { name: "Bolsas", href: "/bolsas" },
  { name: "Gorros", href: "/gorros" },
  { name: "Prendas", href: "/prendas" },
];
const linksSub = [
  { name: "Registrarse", href: "/auth/register" },
  { name: "Iniciar sesión", href: "/auth/login" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className={styles.navHeader}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.linkNav}>
          <h1 className={styles.navTitle}> Moon Design - Tienda Online</h1>
        </Link>

        <nav className="d-flex flex-column align-items-center gap-2">
          <div className="d-flex flex-row gap-3">
            {linksSub.map((link, id) => (
              <div key={id} className="border rounded px-2 py-1">
                {pathname == link.href ? (
                  <Link className={styles.linkNav} href={link.href}>
                    {link.name}
                  </Link>
                ) : (
                  <Link href={link.href} className={styles.linkNav}>
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="d-flex flex-row gap-4">
            {links.map((link, id) => (
              <div key={id}>
                {pathname == link.href ? (
                  <Link className={styles.linkNav} href={link.href}>
                    {link.name}
                  </Link>
                ) : (
                  <Link href={link.href} className={styles.linkNav}>
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
