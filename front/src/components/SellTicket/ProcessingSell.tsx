import React, { memo } from 'react'

const ProcessingSell: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col justify-around items-center h-screen py-10">
      <div>
        <h6 className='text-2xl font-semibold'>Processing your sell request...</h6>
      </div>
      <div>
        <div className='mx-auto h-40 w-40 border border-solid border-gray-300 rounded-full'>
          <div className='animate-spin w-full h-full border-t-2 border-solid border-primaryColor rounded-full'></div>
        </div>
      </div>
      <div className='mt-20 text-center'>
        <div className='text-lg font-semibold text-center'>
          <p>Your sell request is processing. </p>
          <p>It should be confirmed on the blockchain shortly.</p>
        </div>
      </div>
    </div>
  )
}

export default memo(ProcessingSell)