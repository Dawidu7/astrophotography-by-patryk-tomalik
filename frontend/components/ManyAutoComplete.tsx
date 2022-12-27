'use client'

import { useState, useEffect } from 'react'


const ManyAutoComplete = ({ setValue, options, placeholder }: {
  setValue: (value: string) => void,
  options: any[],
  placeholder?: string
}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ values, setValues ] = useState<any[]>([])

  const filteredOptions = inputValue !== '' 
    ? options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase())) 
    : []

  const onSelect = (option: any) => {
    setInputValue('')

    if(values.find(value => value.id === option.id)) return

    if(values.length === 4) return

    setValues(prev => [ ...prev, option ])
  }

  useEffect(() => setValue(values.map(value => value.name).join(', ')), [ values ])

  return (
    <div className='relative'>
      <div className='flex'>
        <ul className='flex items-center gap-x-2 w-min border-b border-white'>
          {values.map(value => (
            <li 
              key={value.id} 
              className='p-1 bg-dark rounded-lg text-sm whitespace-nowrap hover:cursor-pointer hover:bg-light/10'
              onClick={() => setValues(prev => prev.filter(prevValue => prevValue.id !== value.id))}
            >
              {value.name}
            </li>
          ))}
        </ul>
        <input 
          type='text' 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          className='w-full' 
          placeholder={placeholder || ''} 
        />
      </div>
      {filteredOptions.length !== 0 && 
        <ul className='absolute bg-dark mt-1.5 w-full overflow-y-auto rounded-lg overflow-hidden max-h-80 p-1 shadow-xl border border-light/20 z-10'>
          {filteredOptions.map(option => (
            <li 
              key={option.id}
              className='hover:bg-light/10 hover:cursor-pointer rounded-lg px-1'
              onClick={() => onSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ManyAutoComplete