'use client'

import Image from 'next/image'

import useNavbar from '../hooks/useNavbar'

import Logo from '../public/logo.png'


const Footer = () => {
  const navbar = useNavbar()

  return (
    <footer className={`fixed bottom-0 w-full bg-light-dark shadow-xl p-4 transition ease-in-out duration-300 ${!navbar ? 'translate-y-0' : 'translate-y-full'}`}>
      <Image 
        src={Logo}
        alt='Astrophotography by Patryk Tomalik'
        className='mx-auto hover:cursor-pointer'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </footer>
  )
}

export default Footer