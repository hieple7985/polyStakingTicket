import React, { memo, useState } from 'react'

import './SwitchEventType.css'

interface Props {
  eventType: number;
  setEventType: React.Dispatch<React.SetStateAction<number>>;
}

const SwitchEventType: React.FC<Props> = ({eventType, setEventType}: Props): React.ReactElement => {

  return (
    <div className='flex'>
      <div className='switch-event-wrap'>
        <button 
          type='button' 
          className={`switch-event-btn btn-1 ${eventType === 1 && 'active'}`}
          onClick={() => setEventType(1)}
        >
          Traditional
        </button>
        <button 
          type='button' 
          className={`switch-event-btn btn-2 ${eventType === 2 && 'active'}`}
          onClick={() => setEventType(2)}
        >
          Crowdfunding
        </button>
      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default memo(SwitchEventType);