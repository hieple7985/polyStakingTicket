import React, { useState, memo } from 'react'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

import '../../../pages/Event/Event.css'

import '../../TicketContent/Details/TicketDetails.css'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import EventHeaderDetail from '../EventHeaderDetail'
import EventCategories from '../EventCategories'
import HeaderEventDetail from './HeaderEventDetail'
import EventAnalyseDetail from './EventTicketDetail';
import { useQuery } from '@apollo/client';
import Loading from '../../Loading/Loading';
import moment from 'moment';
import EventStatistics from './EventStatistics'
import { useAccountStore } from '../../../context/AccountProvider'
import { observer } from 'mobx-react-lite';
import { EventInterface, GET_EVENT_BY_ID } from '../../../api/queries/getEvents';
import Error from '../../Error/Error'

const EventDetail: React.FC = observer((): React.ReactElement => {
  const [events, setEvents] = useState<EventInterface[]>([])
  const { id, userName } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const userData = useAccountStore();

  const [tab, setTab] = useState(1);
  const { loading, data, error } = useQuery(GET_EVENT_BY_ID, {
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        console.log(data);
        setEvents(data.events)
      },
      fetchPolicy: "no-cache"
    }
  )
  const handleRedirect = (): void => {
    navigate("/issuing_ticket", { state: { event: data.events[0].name, id: data.events[0].id, isExistData: true } });
  }
  
  if (loading) return <Loading />

  if (error) {
    console.log(error);
    return <Error />;
  }
    
  return (
    <>
      {events.length > 0
      ?
        <div className='wrap border-x-only relative'>
          <div className='container event-detail-content pb-12'>
            <EventHeaderDetail rootURL={userName ? `/user/${userName}` : '/event'} name={data.events[0].name} />
            {userData.store.account.user === events[0].owner && (
              <HeaderEventDetail tab={tab} setTab={setTab} />
            )}
            {
              (tab === 1 && events[0]) &&
              <>
                <img src={events[0].image} alt="Ticket" className='event-header-detail__img object-cover h-64 w-full object-center' />
                <div className='mt-5'>
                  <EventCategories categories={events[0].eventCategories} isFull />
                </div>
                <h3 className='font-semibold text-3xl mt-4'>
                  {data.events[0].name}
                </h3>
                <div className='flex-1'>
                  {/* time */}
                  <article className='detail-item'>
                    <div className='detail-icon'>
                      <i>
                        <FaRegCalendarCheck />
                      </i>
                    </div>
                    <div className='detail-info'>
                      <div>
                        <h6>Start Date: {moment(data.events[0].start_date).format('MMMM DD, YYYY')}</h6>
                        <p>{moment(data.events[0].start_date).format('dddd, hh:mm A')}</p>
                      </div>
                      <div className='mt-4'>
                        <h6>End Date: {moment(data.events[0].end_date).format('MMMM DD, YYYY')}</h6>
                        <p>{moment(data.events[0].end_date).format('dddd, hh:mm A')}</p>
                      </div>
                    </div>
                  </article>
                  {/* location */}
                  <article className='detail-item'>
                    <div className='detail-icon'>
                      <i>
                        <IoLocationSharp />
                      </i>
                    </div>
                    <div className='detail-info'>
                      <div>
                        <h6>Location</h6>
                        <p>{data.events[0].location}</p>
                      </div>
                    </div>
                  </article>
                </div>

                {(typeof userName !== "undefined" || data.events[0].status !== 1 || userData.store.account.user !== events[0].owner) || 
                  <div className='footer-full-w-btn w-full mt-28 mb-6 m-auto'>
                    <button
                      type='button'
                      className='primary-btn'
                      onClick={handleRedirect}
                    >
                      Issue Tickets
                    </button>
                  </div>
                  }
              </>
            }
            {
              tab === 2 &&
              <div className='w-full'>
                <EventAnalyseDetail
                  id={data.events[0].id}
                  total={data.events[0].ticket_issued || 0}
                  bought={data.events[0].ticket_sold || 0}
                  ownerAddress={userName} 
                />
              </div>
            }
            {
              tab === 3 &&
              <EventStatistics
                eventID={data.events[0].id}
              />
            }
          </div>
        </div>
      :
        <Error />
      }
    </>
  )
});

export default memo(EventDetail)