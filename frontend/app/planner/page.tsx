'use client'

import { use, useState } from 'react'

import Row from './Row'

import { RowData, Option } from '../../interfaces'

import { insert } from '../../utils'


const getData = async (): Promise<[ Option[], Option[], Option[], Option[], Option[], Option[] ]> => await Promise.all([
  fetch(`${process.env.BACKEND_URL}/planner/catalogs`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/planner/constellations`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/planner/telescopes`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/planner/cameras`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/planner/filters`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/planner/angles`).then(response => response.json()),
])

const queryData = getData()

const Planner = () => {
  const options = use(queryData)
  const [ rows, setRows ] = useState<RowData[]>([])

  return (
    <div className='mx-2 bg-light-dark rounded-lg shadow-xl p-2'>
      <ul>
        {rows.map((row, i) => (
          <Row 
            key={i} 
            row={row} 
            i={i}
            options={options} 
            update={(row, i) => setRows(prev => insert(prev, i!, row))} 
            onDelete={i => setRows(prev => prev.filter((_, idx) => idx !== i))}
          />
        ))}
        <Row 
          i={rows.length}
          options={options} 
          update={row => setRows(prev => [ ...prev, row ])} 
        />
      </ul>
    </div>
  )
}

export default Planner