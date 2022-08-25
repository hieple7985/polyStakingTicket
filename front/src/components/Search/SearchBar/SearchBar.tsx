import React, { useState, memo } from 'react'
import { RiSearchLine } from 'react-icons/ri'

interface Props {
  searchContent: string,
  setSearchContent: React.Dispatch<React.SetStateAction<string>>,
}

const SearchBar: React.FC<Props> = ({setSearchContent}: Props): React.ReactElement => {
  const [value, setValue] = useState<string>('');
  const handleSearch = (): void => {
    setSearchContent(value);
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setSearchContent(value);
    }
  }
  return (
    <section id="search" className='mt-3'>
      <article id="search-bar" className='input'>
        <input 
          type="text" 
          placeholder='Search' 
          className='py-2 bg-transparent flex-1 min-w-0'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <button 
          className='opacity-60 hover:opacity-100 focus:opacity-100 px-4'
          onClick={handleSearch}
        >
          <i className='text-black hover:text-primaryColor focus:text-primaryColor text-2xl'>
            <RiSearchLine />
          </i>
        </button>
      </article>
    </section>
  )
}

export default memo(SearchBar)