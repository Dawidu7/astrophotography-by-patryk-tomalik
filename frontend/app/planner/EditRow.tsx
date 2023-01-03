'use client'

import { useState } from 'react'

import { SearchSelect } from '../../components'

import { RowData, Option } from '../../interfaces'


interface EditRowProps {
  options: [ Option[], Option[], Option[], Option[], Option[], Option[] ],
  update: (row: RowData, i?: number) => void
}

interface SelectData {
  catalog: string | null,
  constellation: string | null,
  telescope: string | null,
  camera: string | null,
  filter: string | null,
  angle: string | null
}

const EditRow = ({ options, update }: EditRowProps) => {
  const [ selectData, setSelectData ] = useState<SelectData>({
    catalog: null,
    constellation: null,
    telescope: null,
    camera: null,
    filter: null,
    angle: null
  })

  const updateRows = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={updateRows} className='flex gap-x-2'>
      <SearchSelect 
        options={options[0]} 
        valueName={selectData.catalog} 
        setValue={value => setSelectData(prev => ({ ...prev, catalog: value }))} 
      />
      <input type='text' name='number' placeholder='Number' />
      <SearchSelect 
        options={options[1]} 
        valueName={selectData.constellation} 
        setValue={value => setSelectData(prev => ({ ...prev, constellation: value }))} 
      />
      <SearchSelect 
        options={options[2]} 
        valueName={selectData.telescope} 
        setValue={value => setSelectData(prev => ({ ...prev, telescope: value }))} 
      />
      <SearchSelect 
        options={options[3]} 
        valueName={selectData.camera} 
        setValue={value => setSelectData(prev => ({ ...prev, camera: value }))} 
      />
      <SearchSelect 
        options={options[4]} 
        valueName={selectData.filter} 
        setValue={value => setSelectData(prev => ({ ...prev, filter: value }))} 
      />
      <input type='text' name='ra' placeholder='RA' />
      <input type='text' name='dec' placeholder='DEC' />
      <input type='text' name='info' placeholder='Info' />
      <SearchSelect 
        options={options[5]} 
        valueName={selectData.angle} 
        setValue={value => setSelectData(prev => ({ ...prev, angle: value }))} 
      />
      <input type="submit" value="Update" />
    </form>
  )
}

export default EditRow