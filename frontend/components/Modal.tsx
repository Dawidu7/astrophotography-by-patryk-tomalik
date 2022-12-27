'use client'

import { useState, useRef, useEffect, ReactElement } from 'react'

import { delay } from '../utils'


interface ModalProps {
  open: boolean,
  onClose: () => void,
  content: ReactElement,
  width?: string,
  padding?: string
}

const Modal = ({ open, onClose, content, width, padding }: ModalProps) => {
  const [ visible, setVisible ] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => setVisible(open), [open])

  useEffect(() => {
    const handleMouseDown = async (e: MouseEvent) => {
      if(modalRef.current?.contains(e.target as HTMLElement) === false) {
        setVisible(false)
        await delay(100)
        onClose()
      }
    }

    window.addEventListener('mousedown', handleMouseDown)

    return () => window.removeEventListener('mousedown', handleMouseDown)
  }, [])

  return (
    <div className={open ? 'fixed top-0 left-0 w-full h-full flex justify-center items-center z-[100]' : ''}>
      {open && 
      <>
        <div className={`fixed w-full h-full bg-black/50 transition duration-100${!visible ? ' opacity-0' : ''}`} />
        <div ref={modalRef} className={`transition ease-in-out duration-[250ms]${!visible ? ' scale-0' : ''} z-[100] ${width || 'w-4/5 sm:w-1/2 lg:w-1/3 2xl:w-1/4'}`}>
          <section className={padding || ''}>{content}</section>
        </div>
      </>}
    </div>
  )
}

export default Modal