'use client'

import { use, useState, useMemo, useEffect } from 'react'

import { SearchSelect, Output } from '../../components'

import { round } from '../../utils'

import { 
  CalculatorCamera as Camera, 
  CalculatorTelescope as Telescope,
  CalculatorFlattReduc as FlattReduc
} from '../../interfaces'


const getData: () => Promise<[Camera[], Telescope[], FlattReduc[]]> = async () => await Promise.all([
  fetch(`${process.env.BACKEND_URL}/calculator/cameras`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/calculator/telescopes`).then(response => response.json()),
  fetch(`${process.env.BACKEND_URL}/calculator/flatt-reducs`).then(response => response.json())
])

const queryData = getData()

const Calculator = () => {
  const options = use(queryData)
  
  const [ selected, setSelected ] = useState<{
    camera: Camera | null,
    telescope: Telescope | null,
    flattReduc: FlattReduc | null
  }>({ camera: null, telescope: null, flattReduc: null })
  const [ results, setResults ] = useState<{
    focalRatio: number | null,
    resolution: number | null,
    fov: { x: number | null, y: number | null }
  }>({ focalRatio: null, resolution: null, fov: { x: null, y: null } })

  useEffect(() => {
    setResults(prev => ({ 
      ...prev, 
      focalRatio: round(selected.telescope?.focal_ratio! * selected.flattReduc?.times!) || null
    }))
  }, [selected.telescope?.focal_length, selected.flattReduc?.times])
  useEffect(() => {
    setResults(prev => ({ 
      ...prev, 
      resolution: round((selected.camera?.pixel_size! / selected.telescope?.focal_length! * 206.265) * selected.flattReduc?.times!) || null
    }))
  }, [selected.camera?.pixel_size, selected.telescope?.focal_length, selected.flattReduc?.times])
  useEffect(() => {
    setResults(prev => ({ 
      ...prev, 
      fov: {
        x: round(selected.camera?.resolution_x! * results.resolution! / 3600) || null, 
        y: round(selected.camera?.resolution_y! * results.resolution! / 3600) || null 
      }
    }))
  }, [selected.camera?.resolution_x, selected.camera?.resolution_y, results.resolution])

  return (
    <section className='w-4/5 2xl:w-3/5 mx-auto lg:flex p-6'>
      <div className='lg:w-1/4 lg:pr-6 flex lg:flex-col gap-6 max-[1023px]:pb-6'>
        <SearchSelect 
          options={options[0]}
          valueName={selected.camera?.name || 'Camera'} 
          setValue={value => setSelected(prev => ({ ...prev, camera: value }))}
        />
        <SearchSelect 
          options={options[1]} 
          valueName={selected.telescope?.name || 'Telescope'} 
          setValue={value => setSelected(prev => ({ ...prev, telescope: value }))}
        />
        <SearchSelect 
          options={options[2]} 
          valueName={selected.flattReduc?.name || 'Flatt/Reduc'} 
          setValue={value => setSelected(prev => ({ ...prev, flattReduc: value }))}
        />
      </div>
      <div className='lg:pl-6 max-[1023px]:border-t lg:border-l border-light w-full'>
        <div className='flex lg:flex-col max-[1023px]:justify-between gap-y-6 pb-6 max-[1023px]:pt-6 border-b border-light'>
          <div className='flex max-[1023px]:flex-col gap-y-6 justify-between'>
            <Output label='Resolution' value={selected.camera?.resolution} />
            <Output label='Matrix Size' value={selected.camera?.matrix_size} />
            <Output label='Pixel Size' value={selected.camera?.pixel_size} />
          </div>
          <div className='flex max-[1023px]:flex-col gap-y-6 justify-between'>
            <Output label='Focal Length' value={selected.telescope?.focal_length && `${selected.telescope?.focal_length}mm`} />
            <Output label='Diameter' value={selected.telescope?.diameter && `${selected.telescope?.diameter}mm`} />
            <Output label='Focal Ratio' value={selected.telescope?.focal_ratio && `f ${selected.telescope?.focal_ratio}`} />
          </div>
          <div className=''>
            <Output label='Times' value={selected.flattReduc?.times && `x${selected.flattReduc?.times}`} />
          </div>
        </div>
        <div className='flex justify-between mt-6'>
          <Output label='Focal (Length / Ratio)' value={
            selected.telescope?.focal_length && selected.flattReduc?.times && results.focalRatio &&
            `${selected.telescope?.focal_length * selected.flattReduc?.times}mm / f ${results.focalRatio}`
          } />
          <Output label='Resolution' value={results.resolution} />
          <Output label='FOV' value={(results.fov.x && results.fov.y) && `${results.fov.x}x${results.fov.y}`} />
        </div>
      </div>
    </section>
  )
}

export default Calculator