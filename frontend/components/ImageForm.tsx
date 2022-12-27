'use client'

import { use, useState } from 'react'

import axios from 'axios'

import SearchSelect from './SearchSelect'
import ManyAutoComplete from './ManyAutoComplete'

import { getFormErrors, uploadImage } from '../utils'


interface ImageData {
  image: File,
  name: string,
  optic: string,
  camera: string,
  mount: string,
  filters: string,
  date: string,
  sqml: string,
  exposure_details: string,
  acquisition: string,
  processing: string,
  info: string,
  annotation: File | null | undefined
}

const getData = async () => await Promise.all([
  fetch(`${process.env.BACKEND_URL}/images/optics`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/cameras`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/mounts`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/filters`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/exposure-details`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/acquisitions`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/processings`).then(response => response.json())
])

const queryData = getData()

const ImageForm = ({ images, onClose }: { images: File[] | null, onClose?: () => void }) => {
  const options = use(queryData)

  const image = images![0]

  const [ values, setValues ] = useState<ImageData>({
    image: image,
    name: image.name.split('.').slice(0, -1).join(''),
    optic: '',
    camera: '',
    mount: '',
    filters: '',
    date: new Date(image.lastModified).toLocaleDateString('en-CA'),
    sqml: '',
    exposure_details: '', 
    acquisition: '', 
    processing: '', 
    info: '', 
    annotation: null
  })

  const submitImages = async () => {
    // Check if any input is empty    
    if(Object.values(values).some(value => !value)) return
    
    console.log(values)
    // Upload images to Cloudinary
    const { status: imageStatus, data: imageData } = await uploadImage(values.image, 'astrophotography-image')
    const { status: annotationStatus, data: annotationData } = await uploadImage(values.annotation!, 'astrophotography-annotation')

    if(imageStatus === 200 && annotationStatus === 200) {
      const response = await axios.post(`${process.env.BACKEND_URL}/images/`, {
        image_url: imageData,
        ...Object.fromEntries(Object.entries(values).slice(1, -1)),
        annotation_url: annotationData
      })

      if(response.status === 201) {
        onClose!()
      }
    }
  }

  return (
    <>
      <h2 className='mb-4'>Create Image</h2>
      <form onSubmit={e => { e.preventDefault(); submitImages() }} className='gap-y-4'>
        <p>{image.name}</p>
        <input 
          type='text' 
          name='name' 
          placeholder='Name' 
          value={values.name} 
          onChange={e => setValues(prev => ({ ...prev, name: e.target.value }))} 
        />
        <SearchSelect 
          options={options[0]}
          valueName={values.optic || 'Optic'} 
          setValue={value => setValues(prev => ({ ...prev, optic: value?.name || '' }))}
        />
        <SearchSelect 
          options={options[1]}
          valueName={values.camera || 'Camera'} 
          setValue={value => setValues(prev => ({ ...prev, camera: value?.name || '' }))}
        />
        <SearchSelect 
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
        <ManyAutoComplete 
          placeholder='Exposure Details' 
          options={options[4]} 
          setValue={value => setValues(prev => ({ ...prev, exposure_details: value }))} 
        />
        <SearchSelect 
          options={options[5]}
          valueName={values.acquisition || 'Acquisition'} 
          setValue={value => setValues(prev => ({ ...prev, acquisition: value?.name || '' }))}
        />
        <ManyAutoComplete 
          placeholder='Processing' 
          options={options[6]} 
          setValue={value => setValues(prev => ({ ...prev, processing: value }))} 
        />
        <textarea 
          rows={3} 
          name='info' 
          placeholder='Info'
          value={values.info} 
          onChange={e => setValues(prev => ({ ...prev, info: e.target.value }))} 
        />
        <input type='file' name='annotation' placeholder='Annotation' onChange={e => setValues(prev => ({ ...prev, annotation: e.target.files![0] }))} />
        <input type='submit' value='Submit' className='w-full' />
      </form>
    </>
  )
}

export default ImageForm