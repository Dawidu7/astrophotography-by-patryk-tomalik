'use client'

import { use, useState } from 'react'

import { AddModal, ConfirmModal } from '../../components'

import { toTitle } from '../../utils'


const getData = async () => {
  const imagesData = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/images/`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/optics`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/cameras`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/mounts`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/filters`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/exposure-details`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/acquisitions`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/processings`).then(response => response.json())
  ])
  const calculatorData = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/calculator/cameras`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/calculator/telescopes`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/calculator/flatt-reducs`).then(response => response.json())
  ])
  const generatorData = await fetch(`${process.env.BACKEND_URL}/generator/`).then(response => response.json())

  return {
    images: {
      images: imagesData[0],
      optics: imagesData[1],
      cameras: imagesData[2],
      mounts: imagesData[3],
      filters: imagesData[4],
      exposure_details: imagesData[5],
      acquisitions: imagesData[6],
      processings: imagesData[7]
    },
    calculator: {
      cameras: calculatorData[0],
      telescopes: calculatorData[1],
      flatt_reducs: calculatorData[2]
    },
    generator: { options: generatorData }
  }
}

const queryData = getData()

const AdminPanel = () => {
  const data = use(queryData)

  // Create Modal
  const [ createdPath, setCreatedPath ] = useState<string | null>(null)

  // Confirm Modal
  const [ deletedOption, setDeletedOption ] = useState<any | null>(null)
  const [ url, setUrl ] = useState('')

  console.log(createdPath)

  return (
    <>
      <div className='grid md:grid-cols-2 sm:w-3/4 mx-auto gap-8 p-4'>
        {Object.entries(data).map(([ page, options ]) => (
          <div key={page} className='bg-light-dark p-4 rounded-xl shadow-xl'>
            <h3 className='mb-4'>{toTitle(page)}</h3>
            <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-y-4'>
              {Object.entries(options).map(([ header, opt ]) => (
                <div key={header}>
                  <h5 className='flex justify-between'>
                    {toTitle(header)}
                    {header !== 'images' && 
                      <button 
                        className='p-0 pr-2 border-0' 
                        onClick={() => setCreatedPath(`${page}/${page === 'generator' ? '' : header}`)}
                      >
                        +
                      </button>
                    }
                  </h5>
                  <ul>
                    {opt.map((o: any) => (
                      <li 
                        key={o.id}
                        className='hover:cursor-pointer hover:text-light'
                        onClick={() => { setDeletedOption(o); setUrl(`${page}/${header.slice(0, -1)}/${o.id}`) }}
                      >
                        {o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal 
        open={deletedOption !== null} 
        onClose={() => setDeletedOption(null)} 
        option={deletedOption}
        url={url}
      />
      <AddModal 
        open={createdPath !== null}
        onClose={() => setCreatedPath(null)}
        header={createdPath?.split('/').at(-1) || ''}
        url={createdPath || ''}
      />
    </>
  )
}

export default AdminPanel