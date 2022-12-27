import Link from 'next/link'
import { default as NextImage } from 'next/image'

import { Image as IImage } from '../interfaces'


const Image = ({ image }: { image: IImage }) => {
  return (
    <Link href={`/${image.name.toLowerCase().replaceAll(' ', '-')}`} className='relative aspect-square rounded-lg shadow-xl overflow-hidden group'>
      <NextImage 
        src={image.image_url}
        alt={image.name}
        className='object-cover transition ease-in-out duration-700 group-hover:scale-125'
        fill
        priority
        sizes='(max-width: 460px) 100vw,
               (max-width: 1024px) 50vw,
               (max-width: 1536px) 33vw,
               25vw'
      />
      <div className="relative w-full h-full bg-black/70 transition ease-in-out duration-500 translate-y-full group-hover:translate-y-0">
        <h4>{image.name}</h4>
      </div>
    </Link>
  )
}

export default Image