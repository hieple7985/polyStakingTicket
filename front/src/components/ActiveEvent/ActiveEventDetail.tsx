import React, { useState, memo } from 'react'
import { FaRegCalendarCheck, FaUser } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

import { FormatDateAndTimeFull } from '../../util/FormatDateAndTimeFull'

import '../../pages/Event/Event.css'
import '../TicketContent/Details/TicketDetails.css'

import EventHeaderDetail from '../Event/EventHeaderDetail'
import TicketCategories from '../TicketContent/Overview/OverviewItem/TicketCategories'
import ErrorPage from '../Error/Error';
import { useQuery } from '@apollo/client'
import TicketList from '../Tickets/TicketList/TicketList'
import Loading from '../Loading/Loading'
import {TicketInterface, GET_TICKETS_BY_EVENT } from '../../api/queries/getTickets'
import { EventInterface } from '../../api/queries/getEvents'

interface Props {
  event: EventInterface;
}

const ActiveEventDetail: React.FC<Props> = ({ event }: Props): React.ReactElement => {
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const { loading, error } = useQuery(GET_TICKETS_BY_EVENT, {
    variables: {
      eventID: event.id,
    },
    skip: event === undefined,
    onCompleted: (data) => {
      setTickets(data.tickets);
    },
    fetchPolicy: "no-cache"
  });
  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorPage />
  }

  if (event) {
    return (
      <div className='wrap border-x-only'>
        <div className='container relative event-detail-content'>
          <EventHeaderDetail image={event.image} rootURL="/home" name={event.name} />
          <TicketCategories categories={event.eventCategories} isFull />
          <h3 className='font-semibold text-3xl mt-4'>
            {event.name}
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
                  <h6>Start Date: {FormatDateAndTimeFull(new Date(event.startDate)).date}</h6>
                  <p>{FormatDateAndTimeFull(new Date(event.startDate)).time}</p>
                </div>
                <div className='mt-4'>
                  <h6>End Date: {FormatDateAndTimeFull(new Date(event.endDate)).date}</h6>
                  <p>{FormatDateAndTimeFull(new Date(event.endDate)).time}</p>
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
                  <p>{event.location}</p>
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
                      <p>{event.owner.substring(0, 8) + '...' + event.owner.substring(event.owner.length - 8, event.owner.length)}</p>
                    </div>
                </div>
              </div>
            </article>
          </div>
          <div className='my-12 w-full'>
            <article>
              <p className='text-lg font-semibold'>Avaiable Ticket(s): {tickets.length}</p>
            </article>
            {tickets.length > 0
              ?
              <article className='mt-6'>
                <TicketList tickets={tickets} />
              </article>
              :
              <article className='mt-6 text-center'>
                <p className=' text-xl text-gray-400 font-semibold'>
                  All tickets are sold!
                </p>
              </article>
            }
          </div>
        </div>
      </div>
    )
  }
  else {
    return <div><ErrorPage /></div>
  }
}

export default memo(ActiveEventDetail)