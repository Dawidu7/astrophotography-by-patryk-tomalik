'use client'

import axios from 'axios'

import Modal from './Modal'


const ConfirmModal = ({ open, onClose, option, url }: { 
  open: boolean, 
  onClose: () => void, 
  option: any, 
  url: string
}) => {
  const onDelete = async () => {
    axios.delete(`${process.env.BACKEND_URL}/${url}`)

    onClose()
  }

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      content={
        <>
          <h4>Delete {option?.name || ''}?</h4>
          <div className='flex justify-end gap-x-2'>
            <button onClick={onClose}>Cancel</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </>
      }
    />
  )
}

export default ConfirmModal