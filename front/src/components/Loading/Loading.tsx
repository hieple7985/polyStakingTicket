import React, {memo} from 'react'
import './Loading.css'

const Loading: React.FC = (): React.ReactElement => {
  return (
    <div className='wrap border-x-only h-screen'>
      <div className='loading-screen h-full flex flex-col justify-center items-center'>
        <div>
          <div className='mx-auto h-40 w-40 border border-solid border-gray-300 rounded-full'>
            <div className='animate-spin w-full h-full border-t-2 border-solid border-primaryColor rounded-full'></div>
          </div>
        </div>
        <div className='flex items-end text-center mt-6 text-2xl text-primaryColor font-semibold'>
          <p className=''>NOW LOADING</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Loading)