import React from 'react'
import { FaRegCalendarCheck, FaUser } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { IoLocationSharp } from 'react-icons/io5';
import { TicketInterface } from '../../api/queries/getTickets';
import { FormatDateAndTimeFull } from '../../util/FormatDateAndTimeFull';
import TicketCategories from '../TicketContent/Overview/OverviewItem/TicketCategories';

import './EventInfo.css'

interface Props {
  setShowEventInfo: React.Dispatch<React.SetStateAction<boolean>>;
  ticket: TicketInterface
}

const EventInfo: React.FC<Props> = ({setShowEventInfo, ticket}: Props): React.ReactElement => {
  const cancelModal = (): void => {
    setShowEventInfo(false);
  }
  
  return (
    <div 
      className='wrap border-x-only min-h-screen bg-transparent flex flex-col' 
      style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
    >
      <div className='event-info-modal-bg'></div>
      <div className='event-info-modal-content'>
        <div className='event-info-modal-exit'>
          <button 
            onClick={cancelModal}
          >
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-11/12 mx-auto flex flex-col items-center relative event-detail-content'>
          <div className='event-header-detail w-full relative mb-6 mt-16'>
            <img src={ticket.event.image} alt="Event" className='event-header-detail__img object-cover h-64 w-full object-center' />
          </div>

          <TicketCategories categories={ticket.event.eventCategories} isFull />
          <h3 className='font-semibold text-3xl mt-4'>
            {ticket.event.name}
          </h3>
          <div className='border-b border-solid w-full pb-12 border-gray-100'>

            {/* Event date & time */}
            <article className='detail-item'>
              <div className='detail-icon'>
                <i>
                  <FaRegCalendarCheck />
                </i>
              </div>
              <div className='detail-info'>
                <div>
                  <h6>Start Date: {FormatDateAndTimeFull(new Date(ticket.event.startDate)).date}</h6>
                  <p>{FormatDateAndTimeFull(new Date(ticket.event.startDate)).time}</p>
                </div>
                <div className='mt-4'>
                  <h6>End Date: {FormatDateAndTimeFull(new Date(ticket.event.endDate)).date}</h6>
                  <p>{FormatDateAndTimeFull(new Date(ticket.event.endDate)).time}</p>
                </div>
              </div>
            </article>

            {/* Event location */}
            <article className='detail-item'>
              <div className='detail-icon'>
                <i>
                  <IoLocationSharp />
                </i>
              </div>
              <div className='detail-info'>
                <div>
                  <h6>Location</h6>
                  <p>{ticket.event.location}</p>
                </div>
              </div>
            </article>
            <article className='detail-item'>
              <div className='detail-icon'>
                <i>
                  <FaUser />
                </i>
              </div>
              <div className='detail-info'>
                <div>
                  <h6>Event Issuer</h6>
                    <div>
                      <p>{ticket.event.owner.substring(0, 8) + '...' + ticket.event.owner.substring(ticket.event.owner.length - 8, ticket.event.owner.length)}</p>
                    </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventInfo