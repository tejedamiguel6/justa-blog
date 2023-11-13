import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='w-full'>
      <ul className='flex m-auto p-4 justify-evenly'>
        <li className='flex-1 text-center border border-teal-500 first:border-r-0 last:border-l-0'>
          <Link href='/'> Home</Link>
        </li>
        <li className='flex-1 text-center border border-teal-500'>
          <Link href='blog'> Blog</Link>
        </li>
        <li className='flex-1 text-center border border-teal-500 border-l-0'>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}
