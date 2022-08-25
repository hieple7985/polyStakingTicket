import React, { memo } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai'
import { CFEventInterface } from '../../api/queries/getCFEvent';

interface Props {
  eventType: number;
}

interface Info {
  buttonLabel: string,
}

const AddEventBtn: React.FC<Props> = ({eventType}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate()

  const handleCreateEvent = (): void => {
    navigate('/event/create_event');
  }

  const handleCreateCFEvent = ():void => {
    navigate('/crowdfunding/event/create');
  }

  const getInfo = (): Info => {
    if (eventType === 2) {
      return {
        buttonLabel: "Add crowdfunding event",
      }
    }
    return {
      buttonLabel: "Add traditional event",
    }
  }

  return (
    <div className='w-full flex justify-end z-40'>
      <button 
        type='button' 
        onClick={eventType === 2 ? handleCreateCFEvent : handleCreateEvent} 
        className="event-add-btn"
      >
        <p className='ml-4 mr-2 text-primaryColor font-semibold text-lg'>{getInfo().buttonLabel}</p>
        <i className='text-primaryColor'><AiFillPlusCircle /></i>
      </button>
    </div>
  )
}

export default memo(AddEventBtn)