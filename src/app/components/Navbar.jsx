import Link from 'next/link';
import '../../styles/global.css'

export default function Navbar() {
  return (
    <header className="mb-8 border-bottom">
      <div className="d-flex align-items-center justify-content-between mx-auto max-w-2xl px-4">
        <Link href="/" className='text-decoration-none'  style={{ color: 'var(--secondary)' }}>
          <h1 className='text-4xl font-bold'> Moon Design - Tienda Online</h1>
        </Link>
      </div>

    </header>
  )
}
