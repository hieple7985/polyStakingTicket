import React from 'react'

const LoadingField2: React.FC = (): React.ReactElement => {
  return (
    <div className='h-6 w-6 border border-solid border-gray-300 rounded-full'>
      <div className='animate-spin w-full h-full border-t-2 border-solid border-primaryColor rounded-full'></div>
    </div>
  )
}

export default LoadingField2