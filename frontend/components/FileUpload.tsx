const FileUpload = () => {
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    console.log('Enter')
  }

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    console.log('Leave')
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    console.log('Drop')
  }

  return (
    <label 
      className={`flex justify-center items-center bg-light/10 p-1 rounded-xl border-2 border-dashed border-dark shadow-lg aspect-square w-80 hover:bg-light/20 hover:cursor-pointer`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span>Drag and Drop</span>
      <input type='file' name='file' hidden />
    </label>
  )
}

export default FileUpload