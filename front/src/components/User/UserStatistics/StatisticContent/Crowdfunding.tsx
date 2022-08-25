import React, { memo } from 'react'
import CFEventList from '../../../Crowdfunding/CFEvent/CFEventList'

import '../../../SwitchEventType/SwitchEventType.css'
import { CFEventInterface } from '../../../../api/queries/getCFEvent';

interface Props {
  cfEvents?: CFEventInterface[];
  cfType: number;
  setCFType: React.Dispatch<React.SetStateAction<number>>;
}

const Crowdfunding: React.FC<Props> = ({cfEvents, cfType, setCFType}: Props): React.ReactElement => {
  return (
    <article className='mb-36 mt-10'>
      <div className='flex'>
        <div className='switch-event-wrap'>
          <button 
            type='button' 
            className={`switch-event-btn btn-1 ${cfType === 1 && 'active'}`}
            onClick={() => setCFType(1)}
          >
            Created
          </button>
          <button 
            type='button' 
            className={`switch-event-btn btn-2 ${cfType === 2 && 'active'}`}
            onClick={() => setCFType(2)}
          >
            Participated
          </button>
        </div>
        <div className='flex-1'></div>
      </div>
      {cfEvents
      ?
        <CFEventList cfEvents={cfEvents}/>
      :
        <>
          {cfType === 1 
          ?
            <div className='stat-null'>You haven’t created any crowdfunding event yet.</div>
          :
            <div className='stat-null'>You haven’t joined any crowdfunding event yet.</div>
          }
        </>
      }
    </article>
  )
}

export default memo(Crowdfunding)