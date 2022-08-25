import React, {memo} from 'react'

import '../IssuingTicket/IssuingTicket.css'


const LoadingModal: React.FC = (): React.ReactElement => {

  return (
    <section className='modal-wrap'>
      <div className='modal-bg'></div>
      <div className='modal-complete fixed mx-auto w-full'>
        <div className='w-10/12 mx-auto border border-solid 
        border-gray-300 bg-white rounded-2xl flex-col items-center py-12'>
          <div className='w-10/12 mx-auto'>
            <div>
              <div className='mx-auto h-40 w-40 border border-solid border-gray-300 rounded-full'>
                <div className='animate-spin w-full h-full border-t-2 border-solid border-primaryColor rounded-full'></div>
              </div>
            </div>
            <div className='w-full text-center mt-12 text-2xl text-primaryColor font-semibold'>
              <p className=''>PROCESSING YOUR TRANSACTION...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(LoadingModal)