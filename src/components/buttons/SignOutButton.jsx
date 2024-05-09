/**
 * Componente de botón para cerrar sesión.
 *
 * @component
 * @example
 * return (
 *   <SignOutButton />
 * )
 */
"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "../Navbar/styles.module.css";

function SignOutButton() {
  const router = useRouter();

  /**
   * Manejador de evento para cerrar sesión.
   */
  const signOutHandler = () => {
    signOut();
    router.push("/cart");
  };

  return (
    <button className={styles.signOut} onClick={signOutHandler}>
      Cerrar sesión
    </button>
  );
}

export default SignOutButton;
