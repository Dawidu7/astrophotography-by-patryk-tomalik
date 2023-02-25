'use client'

import { useState, useRef, useEffect, useMemo } from 'react'

import Searchbar from './Searchbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


interface SearchSelectProps {
  options: any[],
  valueName: string | null,
  setValue: (value: any) => void,
  setModal: () => void,
  className?: string
}

const SearchSelect = ({ options, valueName, setValue, setModal, className }: SearchSelectProps) => {
  const [ open, setOpen ] = useState(false)
  const [ inputValue, setInputValue ] = useState('')
  const dropdownRef = useRef<HTMLUListElement>(null)
  const filteredOptions = useMemo(
    () => options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase())), 
    [inputValue]
  )

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
        <Searchbar 
          value={inputValue}
          setValue={setInputValue}
          className='mb-1.5 px-1 text-lg' 
        />
        <button 
          type='button'
          className='py-0 w-full my-1.5'
          onClick={() => { setOpen(false); setModal() }}
        >
          Custom
        </button>
        <button 
          type='button'
          className='py-0 w-full my-1.5'
          onClick={() => { setValue(null); setOpen(false) }}
        >
          Reset
        </button>
        {filteredOptions.map(option => (
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

export default SearchSelect