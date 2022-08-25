import React, { memo } from 'react'

import IMG_COMPLETE from '../../assets/images/issued_complete.png'

const SellComplete: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h6 className='text-2xl font-semibold mt-20'>Your sell request is completed!</h6>
      </div>
      <div className='w-2/3 mt-20 pb-40'>
        <img src={IMG_COMPLETE} alt="Complete" />
      </div>
    </div>
  )
}

export default memo(SellComplete)