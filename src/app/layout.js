import Navbar from "./components/Navbar/Navbar";

export const metadata = {
  title: 'Mi tienda online',
  description: 'Descubre productos hechos a mano para el día a día',
}

export default function Root({ children }) {
  return (
    <html lang="en">
      <body>
        <header><Navbar></Navbar></header>
        {children}
      </body>
    </html>
  );
}
