import React, { memo } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

const CFHeader: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <article className='w-full mt-6'>
      <h2 className='text-center text-3xl font-bold'>
        THE FUTURE OF 
        <span className='block'>EVENT ORGANIZATION</span>
      </h2>
      <p className='w-3/4 mx-auto text-center mt-3 text-lg'>
        Connecting artists with loyal fans blockchain ventures and NFT assets
      </p>
      <div className='cf-header-btn-wrap flex mt-6'>
        <div 
          className='cf-header-btn first'
          onClick={() => navigate('/crowdfunding/events')}
        >
          <button 
            className='primary-btn'
          >
            Explore
          </button>
          <p className='text-center mt-1 text-lg w-4/5 mx-auto'>Currently active crowdfunding events</p>
        </div>
        <div 
          className='cf-header-btn second ml-4'
          onClick={() => navigate('/crowdfunding/event/create')}
        >
          <button 
            className='secondary-btn'
          >
            Create
          </button>
          <p className='text-center mt-1 text-lg w-4/5 mx-auto'>Your own crowdfunding event</p>
        </div>
      </div>
    </article>
  )
}

export default memo(CFHeader)