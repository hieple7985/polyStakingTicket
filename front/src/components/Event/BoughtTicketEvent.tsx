import React, { useState, memo } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { FaRegCalendarCheck, FaUser } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

import { FormatDateAndTimeFull } from '../../util/FormatDateAndTimeFull'

import '../../pages/Event/Event.css'
import '../TicketContent/Details/TicketDetails.css'

import EventHeaderDetail from '../Event/EventHeaderDetail'
import TicketCategories from '../TicketContent/Overview/OverviewItem/TicketCategories'
import ErrorPage from '../Error/Error';
import { useQuery } from '@apollo/client'
import Loading from '../Loading/Loading'
import {EventInterface, GET_EVENT_BY_ID } from '../../api/queries/getEvents';


interface LocationState {
  eventID: number;
}

const BoughtTicketEvent: React.FC = (): React.ReactElement => {
  const {userName, id} = useParams()
  const [event, setEvent] = useState<EventInterface[]>([]);
  const location = useLocation();
  const locationState = location.state as LocationState;
  const { loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: {
      id: locationState.eventID,
    },
    skip: !locationState,
    onCompleted: (data) => {
      setEvent(data.events);
    },
    fetchPolicy: "no-cache"
  });
  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorPage />
  }

  if (event.length > 0) {
    return (
      <div className='wrap border-x-only'>
        <div className='container relative event-detail-content'>
          <EventHeaderDetail image={event[0].image} rootURL={`/user/${userName}/bought_ticket/${id}`} name={event[0].name} />
          <TicketCategories categories={event[0].eventCategories} isFull />
          <h3 className='font-semibold text-3xl mt-4'>
            {event[0].name}
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
                  <h6>Start Date: {FormatDateAndTimeFull(new Date(event[0].startDate)).date}</h6>
                  <p>{FormatDateAndTimeFull(new Date(event[0].startDate)).time}</p>
                </div>
                <div className='mt-4'>
                  <h6>End Date: {FormatDateAndTimeFull(new Date(event[0].endDate)).date}</h6>
                  <p>{FormatDateAndTimeFull(new Date(event[0].endDate)).time}</p>
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
                  <p>{event[0].location}</p>
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
                      <p>{event[0].owner.substring(0, 8) + '...' + event[0].owner.substring(event[0].owner.length - 8, event[0].owner.length)}</p>
                    </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    )
  }
  else {
    return <div><ErrorPage /></div>
  }
}


export default memo(BoughtTicketEvent)