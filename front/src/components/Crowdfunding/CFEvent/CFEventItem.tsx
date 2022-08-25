import React, { memo } from 'react'

import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle'

import CFEventInfo from './CFEventInfo'

import '../../TicketContent/Overview/OverviewItem/OverviewItem.css'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CFEventInterface } from '../../../api/queries/getCFEvent';
import { cfStatus } from '../../../data/crowdfundingStatus';

interface Props {
  cfEvent: CFEventInterface;
}

const CFEventItem: React.FC<Props> = ({cfEvent}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`/crowdfunding/event/${id}`);
  }
  
  return (
    <div 
      className='ticket-border cursor-pointer'
      onClick={() => handleNavigate(cfEvent.id)}
    >
      {/* Event Image */}
      <div 
        className='relative'
      >
        <img src={cfEvent.image} alt="Event" className='object-cover object-center h-44 w-full select-none'/>
      </div>
      {/* Event Title */}
      <div className='w-10/12 mx-auto'>
        {/* Event Name */}
        <div className='flex justify-between items-center mt-3'>
          <div  
            className='overview-title w-2/3 text-xl font-semibold select-none' 
          >
            <TicketTitle name={cfEvent.name}/>
          </div>
          {cfEvent.status && cfEvent.status < 5 &&
            <div 
              className='py-1 px-2 border border-solid rounded-3xl text-xs font-semibold
            bg-gray-100 border-gray-200 shadow-sm'
            >
              {cfStatus[cfEvent.status].toUpperCase()}
            </div>
          }
        </div>
        {/* Event Info */}
        <div className='mt-2'>
          <CFEventInfo cfEvent={cfEvent}/>
        </div>
      </div>
    </div>
  )
}

export default memo(CFEventItem)