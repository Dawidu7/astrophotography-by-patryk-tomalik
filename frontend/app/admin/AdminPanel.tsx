'use client'

import { use, useState } from 'react'

import { AddModal, ConfirmModal, Modal, ImageForm, EditForm } from '../../components'

import { toTitle } from '../../utils'


const getData = async () => {
  const imagesData = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/images/`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/optics`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/cameras`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/mounts`).then(response => response.json()),
    fetch(`${process.env.BACKEND_URL}/images/filters`).then(response => response.json()),
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
      acquisitions: imagesData[5],
      processings: imagesData[6]
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

  // Image Modal
  const [ imageModalVisible, setImageModalVisible ] = useState(false)

  // Create Modal
  const [ createdPath, setCreatedPath ] = useState<string | null>(null)

  // Confirm Modal
  const [ deletedOption, setDeletedOption ] = useState<any | null>(null)
  const [ url, setUrl ] = useState('')

  // Edit Modal
  const [ editImageId, setEditImageId ] = useState<number | null>(null)
  const editImage = data.images.images.find(({ id }: { id: number }) => id === editImageId)

  return (
    <>
      <div className='grid md:grid-cols-2 sm:w-3/4 mx-auto gap-8 p-4 pb-20'>
        {Object.entries(data).map(([ page, options ]) => (
          <div key={page} className='bg-light-dark p-4 rounded-xl shadow-xl'>
            <h3 className='mb-4'>{toTitle(page)}</h3>
            <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-y-4'>
              {Object.entries(options).map(([ header, opt ]) => (
                <div key={header}>
                  <h5 className='flex justify-between'>
                    <span className='text-light'>{toTitle(header)}</span>
                    <button 
                      className='p-0 pr-2 border-0' 
                      onClick={header !== 'images'
                        ? () => setCreatedPath(`${page}/${page === 'generator' ? '' : header}`)
                        : () => setImageModalVisible(true)
                      }
                    >
                      +
                    </button>
                  </h5>
                  <ul>
                    {opt.map((o: any) => (
                      <li 
                        key={o.id}
                        className='hover:cursor-pointer hover:text-light'
                        onClick={toTitle(header) === 'Images'
                          ? () => setEditImageId(o.id)
                          : () => { setDeletedOption(o); setUrl(`${page}/${header.slice(0, -1)}/${o.id}`) }
                        }
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
      <Modal 
        open={imageModalVisible} 
        onClose={() => setImageModalVisible(false)} 
        content={<ImageForm onClose={() => setImageModalVisible(false)} />} 
      />
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
        url={createdPath?.replaceAll('_', '-') || ''}
      />
      <Modal
        open={editImageId !== null}
        onClose={() => setEditImageId(null)}
        content={<EditForm onClose={() => setEditImageId(null)} image={editImage} />}
      />
    </>
  )
}

export default AdminPanel