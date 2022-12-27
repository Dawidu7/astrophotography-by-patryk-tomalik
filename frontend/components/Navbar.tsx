'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import useAuth from '../hooks/useAuth'

import Logo from '../public/logo.png'


const Navbar = () => {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    {
      name: 'Home',
      route: '/'
    },
    {
      name: 'Calculator',
      route: '/calculator'
    },
    {
      name: 'Generator',
      route: '/generator'
    },
    {
      name: 'Planner',
      route: '/planner'
    },
    user && {
      name: 'Admin',
      route: '/admin'
    }
  ]

  return (
    <nav className='flex flex-col gap-y-8 items-center my-12'>
      <Image src={Logo} alt='Astrophotography By Patryk Tomalik' />
      <ul className={`${user ? 'min-[500px]:flex' : 'min-[400px]:flex'} gap-x-4 text-center`}>
        {navItems.map(item => item && (
          <li key={item.name} className={pathname === item.route ? 'border-b border-white' : 'hover:text-light'}>
            <Link href={item.route}>{item.name}</Link>
          </li>
        ))}
        {user && <li className='hover:text-light hover:cursor-pointer' onClick={logout}>Logout</li>}
      </ul> 
    </nav>
  )
}

export default Navbar