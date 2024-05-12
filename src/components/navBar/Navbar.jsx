"use client";
import Link from "next/link";
import "@/styles/global.css";
import styles from "./styles.module.css";
import SignOutButton from "../buttons/SignOutButton";
import ButtonCart from "../cart/ButtonCart";
import { useSession } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
/**
 * Componente de la barra de navegación.
 *
 * @returns {JSX.Element} El elemento de la barra de navegación.
 */
export default function Navbar() {
  const { data } = useSession();
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav); // Cambia el estado para mostrar u ocultar el menú
  };
  const hideNav = () => {
    setShowNav(false);
  };
  return (
    <header className={styles.navHeader}>
      <div className={styles.navContainer}>
        <Link href="./" className={styles.logo}>
          <img src="/logo_reducido.svg" alt="Logotipo de Moon Design" />
        </Link>
        <button
          className={`navbar-toggler ${styles.navBurguer}`}
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon fs-5">
            <BiMenu />
          </span>{" "}
          {/* Icono de hamburguesa */}
        </button>
        <nav className={styles.nav}>
          <div className="d-flex flex-row gap-4 me-5">
            <Link href={"/"} className={`fw-bold ${styles.linkNav}`}>
              Home
            </Link>
            <Link href="/auth/register" className={styles.linkNav}>
              Registrarse
            </Link>
            {data ? (
              <SignOutButton />
            ) : (
              <Link href="/auth/login" className={styles.linkNav}>
                Iniciar sesión
              </Link>
            )}
          </div>

          <div className="d-flex flex-row gap-3 fs-4 me-5">
            <ButtonCart />
            {data?.user.email && (
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
        <nav
          className={`collapse navbar-collapse ${showNav ? "show" : ""} ${styles.navHidden}`}
        >
          <div className="d-flex flex-column gap-4 me-5">
            <Link
              href={"/"}
              className={`fw-bold ${styles.linkNav}`}
              onClick={hideNav}
            >
              Home
            </Link>
            <Link
              href="/auth/register"
              className={styles.linkNav}
              onClick={hideNav}
            >
              Registrarse
            </Link>
            {data ? (
              <SignOutButton hideNav={hideNav} />
            ) : (
              <Link
                href="/auth/login"
                className={styles.linkNav}
                onClick={hideNav}
              >
                Iniciar sesión
              </Link>
            )}
            <ButtonCart hideNav={hideNav} />
            {data?.user.email && (
              <Link href="/mi-pedido" className={styles.linkNav}>
                Mis pedidos
              </Link>
            )}
          </div>
        </nav>
        {data?.user.role && (
          <div className="w-100">
            <p className="text-end m-3">
              Has iniciado sesion como {data.user.email}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
