import React, {memo} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import { EventInterface } from '../../../api/queries/getEvents';

interface Props {
  event: EventInterface;
}

const EventSliderItem: React.FC<Props> = ({event}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (id: number): void => {
    navigate(`/active_event/${id}`);
  }

  return (
    <div 
      className='ticket-border cursor-pointer'
      onClick={() => handleNavigate(event.id)}
    >
      {/* Ticket Image */}
      <div 
        className='relative'
      >
        <img src={event.image} alt={event.name} className='object-cover object-center h-36 w-full select-none'/>
        <div className='absolute top-0 right-0 flex'>
          <TicketDate start={new Date(event.startDate)} end={new Date(event.endDate)} />
        </div>
      </div>
      {/* Ticket Info */}
      <div className='w-10/12 mx-auto'>
        {/* Ticket Name */}
        <div  
          className='overview-title mt-3 w-full text-xl font-semibold select-none' 
        >
          <TicketTitle name={event.name}/>
        </div>
        {/* ticket Category & Price */}
        <div className='flex justify-between items-center mt-2'>
          {/* Category */}
          <div className='text-xs font-semibold'>
            <TicketCategories categories={event.eventCategories} />  
          </div>
        </div>
        {/* Tickets Summary + Favourite */}
        <div className='flex justify-between items-end mb-4 h-12'>
          {/* Tickets Summary */}
          <TicketSum location={event.location} />
        </div>
      </div>
    </div>
  )
}

export default memo(EventSliderItem)