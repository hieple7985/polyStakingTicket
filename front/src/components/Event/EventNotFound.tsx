import React, {memo} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

import IMG_NOTFOUND from '../../assets/images/search-not-found.png'

interface Props {
  redirectURL: string,
  eventType: number,
}

type Info = {
  message: string,
  button: string,
}

const EventNotFound: React.FC<Props> = ({redirectURL, eventType}: Props): React.ReactElement=> {
  const navigate: NavigateFunction = useNavigate();

  const handleCreateEvent = (redirectURL: string) => {
    navigate(redirectURL);
  }
  
  const getInfo = (eventType: number): Info => {
    if (eventType === 2) {
      return {
        message: "No crowdfunding event created yet",
        button: "Create Crowdfunding Event",
      }
    }
    return {
      message: "No traditional event created yet",
      button: "Create Traditional Event",
    }
  }

  return (
    <>
      <div className='w-3/5 mx-auto mt-12'>
        <img src={IMG_NOTFOUND} alt="Not found" className='object-cover' />
      </div>
      <div className='w-full flex flex-col items-center mt-8'>
        <h6 className='text-xl font-semibold text-primaryColor'>{getInfo(eventType).message}</h6>
        <div className='footer-full-w-btn w-full mt-10'>
          <button
            type='button'
            className='primary-btn'
            onClick={() => handleCreateEvent(redirectURL)}
          >
            {getInfo(eventType).button}
          </button>
        </div>
      </div>
    </>
  )
}

export default memo(EventNotFound)