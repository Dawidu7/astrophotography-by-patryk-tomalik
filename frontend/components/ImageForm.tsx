'use client'

import { use, useState } from 'react'

import axios from 'axios'

import Select from './Select'
import ManyAutoComplete from './ManyAutoComplete'

import { uploadImage } from '../utils'


interface ImageData {
  image: File | null | undefined,
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
  fetch(`${process.env.BACKEND_URL}/images/acquisitions`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/images/processings`).then(response => response.json())
])

const queryData = getData()

const ImageForm = ({ images, onClose }: { images?: File[] | null, onClose?: () => void }) => {
  const options = use(queryData)

  const image = images ? images[0] : null

  const [ values, setValues ] = useState<ImageData>({
    image: image,
    name: image ? image?.name.split('.').slice(0, -1).join('') : '',
    optic: '',
    camera: '',
    mount: '',
    filters: '',
    date: image ? new Date(image.lastModified).toLocaleDateString('en-CA') : '',
    sqml: '',
    exposure_details: '', 
    acquisition: '', 
    processing: '', 
    info: '', 
    annotation: null
  })

  const submitImages = async () => {
    // Upload images to Cloudinary
    const { status: imageStatus, data: imageData } = await uploadImage(values.image!, 'astrophotography-image')

    if(values.annotation !== null && values.annotation !== undefined) {
      var { status: annotationStatus, data: annotationData } = await uploadImage(values.annotation, 'astrophotography-annotation')
    }

    if(imageStatus === 200) {
      const response = await axios.post(`${process.env.BACKEND_URL}/images/`, {
        image_url: imageData,
        ...Object.fromEntries(Object.entries(values).slice(1, -1)),
        annotation_url: values.annotation && annotationStatus === 200 ? annotationData : null
      })

      if(response.status === 201) {
        onClose!()
      }
    }
  }

  return (
    <>
      <h2 className='mb-4 flex justify-between'>
        <span>Create Image</span>
        <button className="border-none" onClick={() => onClose!()}>X</button>
      </h2>
      <form onSubmit={e => { e.preventDefault(); submitImages() }} className='gap-y-4'>
        {image
          ? <p>{image.name}</p>
          : <input type='file' name='image' placeholder='Image' onChange={e => setValues(prev => ({ ...prev, image: e.target.files![0] }))} />
        }
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
        <input type='file' name='annotation' placeholder='Annotation' onChange={e => setValues(prev => ({ ...prev, annotation: e.target.files![0] }))} />
        <input type='submit' value='Submit' className='w-full' />
      </form>
    </>
  )
}

export default ImageForm