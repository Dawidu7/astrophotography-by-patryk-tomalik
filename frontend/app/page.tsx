'use client'

import { useEffect, useState } from 'react'

import { Image, Modal, ImageForm } from '../components'

import { useDrop } from '../hooks'

import { Image as IImage } from '../interfaces'


const Home = () => {
  const [ images, setImages ] = useState<IImage[]>([])
  const [ modalVisible, setModalVisible ] = useState(false)
  const droppedImages = useDrop(['jpg', 'png'])

  useEffect(() => {
    async function getImages() {
      const images: Promise<IImage[]> = await fetch(`${process.env.BACKEND_URL}/images/`)
        .then(response => response.json())
        .then(data => data.sort(() => Math.random() - .5))

      setImages(await images)
    }

    getImages()
  }, [])

  useEffect(() => { droppedImages!?.length > 0 && setModalVisible(true) }, [droppedImages])

  return (
    <>
      <div className='grid min-[490px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:w-4/5 p-4 mb-[72px] mx-auto'>
        {images.map(image => (
          <Image key={image.id} image={image} />
        ))}
      </div>
      <Modal 
        open={modalVisible} 
        content={<ImageForm images={droppedImages} onClose={() => setModalVisible(false)} />} 
      />
    </>
  )
}

export default Home