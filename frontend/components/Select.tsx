'use client'

import { useState, useRef, useEffect, useMemo } from 'react'

import Searchbar from './Searchbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


interface SelectProps {
  options: any[],
  valueName: string | null,
  setValue: (value: any) => void,
  className?: string
}


const Select = ({ options, valueName, setValue, className }: SelectProps) => {
  const [ open, setOpen ] = useState(false)
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if(dropdownRef.current?.contains(e.target as HTMLElement) === false) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleMouseDown)

    return () => window.removeEventListener('mousedown', handleMouseDown)
  }, [])

  return (
    <div className={`relative w-full${className ? ` ${className}` : ''}`}>
      <button 
        type='button'
        className='border-0 bg-dark h-8 w-full flex items-center justify-between'
        onClick={() => setOpen(!open)}
      >
        <span className='font-bold text-light'>{valueName}</span>
        <FontAwesomeIcon icon={faCaretDown} className='text-light w-2.5' />
      </button>
      <ul 
        ref={dropdownRef}
        className={`absolute bg-dark mt-1.5 w-full overflow-y-auto rounded-lg overflow-hidden${!open ? ' hidden' : ''} max-h-80 p-1 shadow-xl border border-light/20 z-10`}
      >
        {options.map(option => (
          <li
            key={option.name}
            className='p-1 hover:bg-light/30 hover:cursor-pointer rounded-lg'
            onClick={() => { setValue(option); setOpen(false) }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select