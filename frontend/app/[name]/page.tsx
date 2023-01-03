'use client'

import { use, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { Modal } from '../../components'

import { getImageSize, toTitle } from '../../utils'

import { Image as IImage } from '../../interfaces'


const getData: () => Promise<IImage[]> = async () => await fetch(`${process.env.BACKEND_URL}/images/`).then(response => response.json())

const queryData = getData()

const ImageInfo = () => {
  const pathname = usePathname()?.split('/').at(-1)
  const image = use(queryData).find(({ name }) => pathname === name.toLowerCase().replaceAll(' ', '-'))
  const [ annotation, setAnnotation ] = useState(false)
  const [ horizontal, setHorizontal ] = useState(true)

  useEffect(() => {
    const getImageRatio = async () => {
      const isHorizontal = await getImageSize(image?.image_url!, (width, height) => width > height)

      if(isHorizontal === false) setHorizontal(false)
    }

    getImageRatio()
  }, [])

  return (
    image === undefined ? <p className='text-red-600 text-4xl text-center'>Image Not Found</p>
    : <>
      <div className='w-11/12 md:w-3/4 mx-auto flex flex-col justify-center gap-y-8 mb-24'>
        <section>
          <h2 className='text-center'>{image.name}</h2>
        </section>
        <section className={`relative ${horizontal ? 'aspect-video' : 'aspect-[4/5] w-2/3 mx-auto'}`}>
          <Image 
            src={image.image_url}
            alt={image.name}
            fill
            className='object-cover rounded-lg'
            sizes='75vw'
          />
        </section>
        <section className='flex'>
          <div className='flex flex-col gap-y-1 w-2/5 pr-4'>
            {Object.entries(image).slice(3, 12).map((data, i) => (
              <div key={i} className='flex justify-between'>
                <p>{`${toTitle(data[0])}: `}</p>
                <p>{data[1]}</p>
              </div>
            ))}
          </div>
          <div className='pl-4 flex flex-col justify-between gap-y-2 w-3/5 border-l-2 border-dark'>
            <p className='break-words'>{image.info}</p>
            {image.annotation_url &&
              <div className={`relative ${horizontal ? 'aspect-video' : 'aspect-[4/5] w-2/3 mx-auto'}`}>
                <Image 
                  src={image.annotation_url}
                  alt={image.name}
                  fill
                  sizes='50vw'
                  className='object-cover rounded-lg hover:cursor-pointer'
                  onClick={() => setAnnotation(true)}
                />
              </div>
            }
          </div>
        </section>
      </div>
      {image.annotation_url &&
        <Modal 
          open={annotation}
          onClose={() => setAnnotation(false)}
          content={
            <div className={`relative ${horizontal ? 'aspect-video' : 'aspect-[4/5]'}`}>
              <Image 
                src={image.annotation_url}
                alt={image.name}
                fill
                sizes='75vw'
                className='object-cover rounded-lg'
              />
            </div>
          }
          width={horizontal ? 'w-4/5' : 'w-1/2'}
          padding='p-0'
        />
      }
    </>
  )
}

export default ImageInfo