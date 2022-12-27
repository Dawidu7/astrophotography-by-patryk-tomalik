'use client'

import { use, useEffect, useState } from 'react'

import { Image, Modal, ImageForm } from '../components'

import { useDrop } from '../hooks'

import { Image as IImage } from '../interfaces'


const getData = async (): Promise<IImage[]> => await fetch(`${process.env.BACKEND_URL}/images/`).then(response => response.json())

const queryData = getData()

const Home = () => {
  const images = use(queryData)
  const [ modalVisible, setModalVisible ] = useState(false)
  const droppedImages = useDrop(['jpg', 'png'])

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
        onClose={() => setModalVisible(false)} 
        content={<ImageForm images={droppedImages} onClose={() => setModalVisible(false)} />} 
      />
    </>
  )
}

export default Home