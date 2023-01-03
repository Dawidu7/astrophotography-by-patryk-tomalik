const getImageSize = async (url: string, callback?: (width: number, height: number) => any) => {
  const image = new Image()
  image.src = url
  await image.decode()

  if(typeof callback === 'undefined') return [ image.width, image.height ]

  return callback(image.width, image.height)
}

export default getImageSize