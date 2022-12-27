'use client'

import { useState, useEffect } from 'react'

import { insert } from '../utils'


const useMultiForm = (forms: any[]) => {
  const [ currentFormIndex, setCurrentFormIndex ] = useState(0)

  const form = forms[currentFormIndex]

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    set: React.Dispatch<React.SetStateAction<any[]>>
  ) => set(prev => insert(prev, currentFormIndex, {
    ...form,
    [e.target.name]: e.target.value
  }))

  const toNext = () => setCurrentFormIndex(i => i >= forms.length - 1 ? i : i + 1)
  const toPrevious = () => setCurrentFormIndex(i => i <= 0 ? i : i - 1)
  const toCustom = (formIndex: number) => setCurrentFormIndex(formIndex)

  return { 
    currentFormIndex,
    form, 
    onChange,
    toNext, 
    toPrevious, 
    toCustom, 
    isFirstForm: currentFormIndex === 0,
    isLastForm: currentFormIndex === forms.length - 1 
  }
}

export default useMultiForm