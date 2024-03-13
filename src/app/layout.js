import Navbar from "./components/Navbar";

export const metadata = {
  title: 'Mi tienda online',
  description: 'Descubre productos hechos a mano para el día a día',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header><Navbar></Navbar></header>
        {children}
      </body>
    </html>
  );
}
