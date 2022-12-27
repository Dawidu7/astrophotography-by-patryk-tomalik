'use client'

import { useState, useEffect } from 'react'



const useNavbar = () => {
  const [ visible, setVisible ] = useState(true)

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset < document.querySelector('nav')!?.clientHeight + 48)

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return visible
}

export default useNavbar