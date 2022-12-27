import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


interface SearchbarProps {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  className?: string
}

const Searchbar = ({ value, setValue, className }: SearchbarProps) => {
  return (
    <div className={`relative${className ? ` ${className}` : ''}`}>
      <span className='absolute inset-y-0 flex items-center pointer-events-none'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input 
        type='text' 
        placeholder='Search' 
        className='pl-6 w-full' 
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default Searchbar