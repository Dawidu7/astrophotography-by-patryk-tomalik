'use client'

import { useState } from 'react'

import { RowData, Option } from '../../interfaces'

import EditRow from './EditRow'


interface RowProps {
  row?: RowData,
  options: [ Option[], Option[], Option[], Option[], Option[], Option[] ],
  i: number,
  update: (row: RowData, i?: number) => void,
  onDelete?: (i: number) => void,
}

const Row = ({ row, options, i, update, onDelete }: RowProps) => {
  const [ isEdit, setIsEdit ] = useState(false)

  return (
    <li className='grid grid-rows-[repeat(11, minmax(0, 1fr))]'>
      {row && isEdit
        ? <>
        <span>{row.catalog}</span>
        <span>{row.number}</span>
        <span>{row.constellation}</span>
        <span>{row.telescope}</span>
        <span>{row.camera}</span>
        <span>{row.filter}</span>
        <span>RA {row.ra}</span>
        <span>DEC {row.dec}</span>
        <span>{row.info}</span>
        <span>{row.angle}&#8451;</span>
        <button onClick={() => setIsEdit(true)}>Edit</button>
        </>
        : <EditRow options={options} update={!row ? update : () => update(row, i)} />
      }
    </li>
  )
}

export default Row