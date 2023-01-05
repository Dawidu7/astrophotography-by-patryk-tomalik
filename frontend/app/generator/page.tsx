'use client'

import { use, useState, useRef } from 'react'

import { SearchSelect } from '../../components'

import { isNumeric, saveFile } from '../../utils'

import { GeneratorCatalog as Catalog } from '../../interfaces'


interface DS { id: number, name: string }

const getData: () => Promise<Catalog[]> = async () => await fetch(`${process.env.BACKEND_URL}/generator/`).then(response => response.json())

const queryData = getData()

const Generator = () => {
  const catalogs = use(queryData)
  const [ catalog, setCatalog ] = useState<Catalog | null>(null)
  const [ DSs, setDSs ] = useState<DS[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const isValid = (values: string) => {
    const valuesSplit = values.split('-')

    if(valuesSplit.some(value => !isNumeric(value))) return false
    if(Number(valuesSplit[0]) >= Number(valuesSplit[1])) return false

    return true
  }

  const addDS = () => {
    const input = inputRef.current
    if(!input) return

    const inputSplit = input.value.split(' ')
    if(inputSplit.some(i => !isValid(i))) return

    inputSplit.forEach(value => {
      if(value.includes('-')) {
        const range = value.split('-').map(value => Number(value))
        for(let i = range[0]; i <= range[1]; i++) {
          setDSs(prev => [
            ...prev,
            { id: catalog ? 4 : 3, name: `${catalog ? `${catalog.value} ` : ''}${i}` }
          ])
        }
      }
      else setDSs(prev => [
        ...prev,
        { id: catalog ? 4 : 3, name: `${catalog ? `${catalog.value} ` : ''}${value}` }
      ])
    })

    setCatalog(null)
    input.value = ''
  }

  const save = () => {
    if(DSs.length === 0) return

    saveFile([
      'SkySafariObservingListVersion=3.0\n',
      'SortedBy=Default Order',
      ...DSs.map(DS => [
          '\n',
          'SkyObject=BeginObject',
          `ObjectID=${DS.id}, -1, -1`,
          `CatalogNumber=${DS.name}`,
          'EndObject=SkyObject'
        ].join('\n')
      )
    ], 'generator', 'skylist')
  }

  return (
    <div className='flex justify-evenly'>
      <section className='flex gap-x-4 items-center h-min'>
        <SearchSelect 
          options={catalogs} 
          valueName={catalog?.name || 'Catalog'}
          setValue={value => setCatalog(value)}
          className='w-40'
        />
        <input type='text' ref={inputRef} placeholder='e.g. 1 3 5-8' />
        <button className='sm' onClick={addDS}>Add</button>
      </section>
      <section className='h-min'>
        <div className='flex justify-between'>
          <button className='sm' onClick={save}>Save</button>
          <button className='sm' onClick={() => setDSs([])}>Delete All</button>
        </div>
        <div className='flex flex-col gap-y-2 break-all mt-4'>
          <p className='p-1'>
            SkySafariObservingListVersion=3.0 <br />
            SortedBy=Default Order <br />
          </p>
          {DSs.map((DS, i) => (
            <p 
              key={i} 
              className='hover:cursor-pointer hover:bg-light/10 p-1 rounded-lg'
              onClick={() => setDSs(prev => prev.filter((_, DSi) => DSi !== i))}
            >
              SkyObject=BeginObject <br />
              ObjectID={DS.id}, -1, -1 <br />
              CatalogNumber={DS.name} <br />
              EndObject=SkyObject
            </p>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Generator