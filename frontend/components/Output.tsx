const Output = ({ label, value }: { label: string, value: any }) => {
  return (
    <div className='relative'>
      <label className='absolute -top-[37%] text-sm text-light'>{label}</label>
      <input type='text' disabled value={value || ''} />
    </div>
  )
}

export default Output