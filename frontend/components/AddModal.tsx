'use client'

import axios from 'axios'

import Modal from './Modal'

import { toTitle } from '../utils'


const AddModal = ({ open, onClose, header, url }: { 
  open: boolean, 
  onClose: () => void, 
  header: string,
  url: string
}) => {
  const onAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = e.currentTarget.optionName.value

    axios.post(`${process.env.BACKEND_URL}/${url}`, {
      name: name
    })

    onClose()
  }

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      content={
        <form onSubmit={onAdd} className='flex flex-col gap-y-4'>
          <h4>Add {toTitle(header)}</h4>
          <input type='text' name='optionName' placeholder='Name' className='w-full text-lg' />
          <div className='flex justify-end gap-x-2'>
            <button type='button' onClick={onClose}>Cancel</button>
            <button>Add</button>
          </div>
        </form>
      }
    />
  )
}

export default AddModal