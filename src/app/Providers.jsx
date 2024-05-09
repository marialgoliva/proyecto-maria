"use client";
import { SessionProvider } from "next-auth/react";

/**
 * Un componente que envuelve a sus hijos con el proveedor de sesión de next-auth.
 *
 * @component
 * @param {Object} props - Las propiedades pasadas a este componente.
 * @param {ReactNode} props.children - Los componentes hijos que este componente envolverá.
 * @returns {JSX.Element} Un componente que envuelve a sus hijos con el proveedor de sesión de next-auth.
 */
function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
