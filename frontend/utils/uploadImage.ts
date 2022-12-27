import axios from 'axios'



const uploadImage = async (image: File, uploadPreset: string) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', uploadPreset)

  return await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, formData)
    .then(response => ({ status: response.status, data: response.data.secure_url }))
    .catch(error => ({ status: error.response.status, data: error.response.data }))
}

export default uploadImage