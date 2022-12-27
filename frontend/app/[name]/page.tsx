'use client'

import { use, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { Modal } from '../../components'

import { toTitle } from '../../utils'

import { Image as IImage } from '../../interfaces'


const getData: () => Promise<IImage[]> = async () => await fetch(`${process.env.BACKEND_URL}/images/`).then(response => response.json())

const queryData = getData()

const ImageInfo = () => {
  const pathname = usePathname()?.split('/').at(-1)
  const image = use(queryData).find(({ name }) => pathname === name.toLowerCase().replaceAll(' ', '-'))
  const [ annotation, setAnnotation ] = useState(false)

  return (
    image === undefined ? <p className='text-red-600 text-4xl text-center'>Image Not Found</p>
    : <>
      <div className='w-11/12 md:w-3/5 mx-auto flex flex-col justify-center gap-y-8 mb-24'>
        <section>
          <h2 className='text-center'>{image.name}</h2>
        </section>
        <section className='relative aspect-video'>
          <Image 
            src={image.image_url}
            alt={image.name}
            fill
            className='object-cover rounded-lg'
            sizes='75vw'
          />
        </section>
        <section className='flex'>
          <div className='flex flex-col gap-y-1 w-1/2 pr-4'>
            {Object.entries(image).slice(3, 12).map(data => (
              <div key={data[1]} className='flex justify-between'>
                <p>{`${toTitle(data[0])}: `}</p>
                <p>{data[1]}</p>
              </div>
            ))}
          </div>
          <div className='pl-4 flex flex-col justify-between gap-y-2 w-1/2 border-l border-white'>
            <p className='break-words'>{image.info}</p>
            <div className="relative aspect-video">
              <Image 
                src={image.annotation_url}
                alt={image.name}
                fill
                sizes='50vw'
                className='object-cover rounded-lg hover:cursor-pointer'
                onClick={() => setAnnotation(true)}
              />
            </div>
          </div>
        </section>
      </div>
      <Modal 
        open={annotation}
        onClose={() => setAnnotation(false)}
        content={
          <div className="relative aspect-video">
            <Image 
              src={image.annotation_url}
              alt={image.name}
              fill
              sizes='75vw'
              className='object-cover rounded-lg'
            />
          </div>
        }
        width='w-4/5'
        padding='p-0'
      />
    </>
  )
}

export default ImageInfo