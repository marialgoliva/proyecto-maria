"use client"
import Link from 'next/link';
import '@/styles/global.css'
import { usePathname } from 'next/navigation';
import styles from '../Navbar/styles.module.css'

const links = [
  {name: 'Home', href: '/'},
  {name: 'Bolsas', href: '/bolsas' },
  {name: 'Gorros', href: '/gorros'},
  {name: 'Prendas', href: '/prendas'}
]


export default function Navbar() {
  const pathname=usePathname()
  return (
    <header className={styles.navHeader}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.linkNav}  >
          <h1 className={styles.navTitle}> NavBar - Tienda Online</h1>
        </Link>

        <nav className={styles.nav}>
          {
          links.map((link,id) => 
            (
              <div key={id}>
                {
                  pathname==link.href ? 
                  (
                    <Link className={styles.linkNav} href={link.href}>{link.name}</Link>
                  )
                  :(
                    <Link href={link.href} className={styles.linkNav}>{link.name}</Link>
                  )
                }
              </div>
          ))
          }
        </nav>
      </div>

    </header>
  );
}
