import React, {memo} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

import IMG_COMPLETE from '../../assets/images/issued_complete.png'

import '../IssuingTicket/IssuingTicket.css'

const CompleteModal: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (): void => {
    navigate("/home");
  } 
  return (
    <section className='modal-wrap'>
      <div className='modal-bg'></div>
      <div className='modal-complete fixed flex justify-center w-full'>
        <div className='w-11/12 mx-auto border border-solid 
        border-gray-300 bg-white rounded-2xl flex-col items-center py-6'>
          <div className='w-10/12 mx-auto'>
            <img src={IMG_COMPLETE} alt="Complete" />
            <p className='text-center text-primaryColor font-semibold text-lg mt-6'>
              Great! You have bought this ticket successfully.
            </p>
            <div className='footer-full-w-btn mt-6'>
              <button className='primary-btn' onClick={handleNavigate}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(CompleteModal)