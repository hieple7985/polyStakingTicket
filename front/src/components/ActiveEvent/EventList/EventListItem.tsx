import React, {memo} from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import { EventInterface } from '../../../api/queries/getEvents';

interface Props {
  event: EventInterface;
  ownerAddress?: string;
  fromEventPage?: boolean;
}

const EventListItem: React.FC<Props> = ({event, ownerAddress, fromEventPage}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  
  const handleNavigate = (id: number): void => {
    if (ownerAddress) {
      navigate(`/user/${ownerAddress}/issued_event/${id}`);
    }
    else if (fromEventPage) {
      navigate(`/event/${id}`)
    }
    else {
      navigate(`/active_event/${id}`);
    }
  }

  return (
    <div 
      className='ticket-border cursor-pointer mt-6'
      onClick={() => handleNavigate(event.id)}
    >
      {/* Event Image */}
      <div className='relative'>
        <img src={event.image} alt={event.name} className='object-cover object-center h-32 w-full select-none'/>
        <div className='absolute top-0 right-0 flex'>
          <TicketDate start={new Date(event.startDate)} end={new Date(event.endDate)} />
        </div>
      </div>
      {/* Event Info */}
      <div className='w-10/12 mx-auto'>
        {/* Event Name */}
        <div className='flex justify-between mt-4'>
          <div className='overview-title w-3/5 text-xl font-semibold select-none'>
            <TicketTitle name={event.name}/>
          </div>
          <div className='text-xs font-semibold w-2/5 ml-2 flex justify-end overflow-hidden whitespace-nowrap	'>
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

export default memo(EventListItem)

    // <div 
    //   className='ticket-border flex w-full h-52 mt-4 cursor-pointer hover:opacity-80'
    //   onClick={() => handleNavigate(props.event.id)}
    // >
    //   {/* Ticket Image */}
    //   <div 
    //     className='w-2/5 relative'
    //   >
    //     <img 
    //       src={props.event.image} 
    //       alt={props.event.name} 
    //       className="object-cover object-center h-full w-full select-none"
    //     />
    //     <div className='absolute top-0 right-0 flex flex-col mt-1'>
    //       <TicketDate start={new Date(props.event.startDate)} end={new Date(props.event.endDate)} />
    //     </div>
    //   </div>
    //   <div className='w-3/5'>
    //     {/* Ticket Info */}
    //     <div className='w-10/12 h-full mx-auto flex flex-col'>
    //       {/* Ticket Name */}
    //       <div 
    //         className='overview-title mt-4 w-full text-xl font-semibold select-none'
    //       >
    //         <TicketTitle name={props.event.name}/>
    //       </div>
    //       {/* Ticket Category & Price */}
    //       <div className='flex justify-between items-center mt-2'>
    //         {/* Category */}
    //         <div className='text-xs font-semibold'>
    //           <TicketCategories categories={props.event.eventCategories} />  
    //         </div>
    //         {/* Price */}
    //         {/* <div className='text-lg font-bold'>
    //           <TicketPrice price={props.ticket.ticketPrice}/>
    //         </div> */}
    //       </div>
          
    //       {/* Tickets Summary + Favourite */}
    //       <div className='flex justify-between items-end flex-1 mb-4'>
    //         {/* Tickets Summary */}
    //         <div>
    //           {props.hideSum
    //           ? <div className='flex flex-1 items-end'>
                  
    //             </div>
    //           : <div className='flex items-end '>
    //               <TicketSum location={props.event.location} ticketTypeList={getTicketType(props.event)}/>
    //           </div>
    //           }
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

//  {/* ticket Category & Price */}
//  <div className='flex justify-between items-center mt-2'>
//  {/* Category */}
//  <div className='text-xs font-semibold'>
//    <TicketCategories categories={event.eventCategories} />  
//  </div>
// </div>