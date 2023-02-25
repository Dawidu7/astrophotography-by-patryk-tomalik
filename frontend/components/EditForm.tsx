'use client'

import { use, useState } from 'react'

import axios from'axios'

import Select from './Select'
import ManyAutoComplete from './ManyAutoComplete'


interface Image {
  acquisition: string,
  annotation_url: string,
  camera: string,
  date: string,
  exposure_details: string,
  filters: string,
  id: number,
  image_url: string,
  info: string,
  mount: string,
  name: string,
  optic: string,
  processing: string,
  sqml: string
}

const getData = async () => await Promise.all([
  fetch(`${process.env.BACKEND_URL}/images/optics`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/cameras`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/mounts`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/filters`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/acquisitions`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/processings`).then(response => response.json())
])

const queryData = getData()

const EditForm = ({ image, onClose }: { image: Image, onClose: () => void }) => {
  const options = use(queryData)

  const [ values, setValues ] = useState(image)

  const submitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submit = (e.currentTarget.querySelector('input[type="submit"]:focus') as HTMLInputElement).value
    
    if(submit === 'Delete') {
      await axios.delete(`${process.env.BACKEND_URL}/images/image/${image.id}`)
    }
    else {
      await axios.put(`${process.env.BACKEND_URL}/images/image/${image.id}`, { ...values })
    }

    onClose()
  }

  return (
    <>
      <h2 className='mb-4 flex justify-between'>
        <span>Edit Image</span>
        <button className="border-none" onClick={() => onClose!()}>X</button>
      </h2>
      <form onSubmit={submitEdit} className='gap-y-4'>
        <input 
          type='text' 
          name='name' 
          placeholder='Name' 
          value={values.name} 
          onChange={e => setValues(prev => ({ ...prev, name: e.target.value }))} 
        />
        <Select 
          options={options[0]}
          valueName={values.optic || 'Optic'} 
          setValue={value => setValues(prev => ({ ...prev, optic: value?.name || '' }))}
        />
        <Select 
          options={options[1]}
          valueName={values.camera || 'Camera'} 
          setValue={value => setValues(prev => ({ ...prev, camera: value?.name || '' }))}
        />
        <Select 
          options={options[2]}
          valueName={values.mount || 'Mount'} 
          setValue={value => setValues(prev => ({ ...prev, mount: value?.name || '' }))}
        />
        <ManyAutoComplete 
          placeholder='Filters' 
          options={options[3]} 
          setValue={value => setValues(prev => ({ ...prev, filters: value }))} 
        />
        <input 
          type='date' 
          name='date' 
          placeholder='Date'
          value={values.date}
          onChange={e => setValues(prev => ({ ...prev, date: e.target.value }))} 
        />
        <input 
          type='text' 
          name='sqml' 
          placeholder='SQML' 
          value={values.sqml} 
          onChange={e => setValues(prev => ({ ...prev, sqml: e.target.value }))} 
        />
        <input 
          type='text' 
          name='exposure_details' 
          placeholder='Exposure Details' 
          value={values.exposure_details} 
          onChange={e => setValues(prev => ({ ...prev, exposure_details: e.target.value }))} 
        />
        <ManyAutoComplete 
          options={options[4]}
          placeholder='Acquisition'
          setValue={value => setValues(prev => ({ ...prev, acquisition: value }))}
        />
        <ManyAutoComplete 
          placeholder='Processing' 
          options={options[5]} 
          setValue={value => setValues(prev => ({ ...prev, processing: value }))} 
        />
        <textarea 
          rows={3} 
          name='info' 
          placeholder='Info'
          value={values.info} 
          onChange={e => setValues(prev => ({ ...prev, info: e.target.value }))} 
        />
        <div className="flex gap-x-2 justify-end">
          <input type="submit" value="Delete" />
          <input type='submit' value='Submit' />
        </div>
      </form>
    </>
  )
}

export default EditForm