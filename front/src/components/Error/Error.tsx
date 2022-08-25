import React, { memo } from 'react'

import IMG_ERROR from '../../assets/images/search-not-found.png'
import { NavigateFunction, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className='wrap border-x-only'>
      <div className='container justify-center'>
        <div className='w-3/5'>
          <img src={IMG_ERROR} alt="404 Not Found!" className='object-cover'/>
        </div>
        <div className='text-center mt-10 text-primaryColor '>
          <p className='font-bold' style={{fontSize: 60}}>OOPS!</p>
          <small className='font-semibold text-xl'>SOMETHING HAS GONE WRONG...</small>
        </div>
        <div className='w-full footer-full-w-btn mt-12'>
          <button 
            className='primary-btn px-4'
            onClick={() => navigate('/home')}
          >
            Return to home page
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(ErrorPage)