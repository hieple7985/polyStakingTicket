import React, {memo} from 'react'

import IMG_NOTFOUND from '../../../assets/images/search-not-found.png'

const SearchNotFound = () => {
  return (
    <>
      <div className='w-3/5 mx-auto mt-10 pt-4'>
        <img src={IMG_NOTFOUND} alt="Not found" className='object-cover'/>
      </div>
      <div className='w-full flex flex-col items-center mt-8'>
        <h6 className='text-xl font-semibold text-primaryColor'>No results found</h6>
        <p className='mt-2'>Please try another keyword</p>
      </div>
    </>
  )
}

export default memo(SearchNotFound)