'use client'

import { useState, useEffect } from 'react'

import useAuth from './useAuth'


const useDrop = (allowedExtenstions?: string[]) => {
  const [ files, setFiles ] = useState<File[] | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => { 
      if(user) {
        e.preventDefault()
        e.stopPropagation() 
      }
    }
    const handleDrop = (e: DragEvent) => {
      if(user) {
        e.preventDefault()
        e.stopPropagation()
  
        const files = Array.from(e.dataTransfer!?.files)
  
        setFiles(allowedExtenstions 
          ? files.filter(file => allowedExtenstions.includes(file.name.split('.').at(-1)!)) 
          : files
        )
      }
    }

    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
    }
  })

  return files
}

export default useDrop