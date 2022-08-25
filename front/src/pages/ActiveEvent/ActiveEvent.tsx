import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import ErrorPage from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import ActiveEventDetail from '../../components/ActiveEvent/ActiveEventDetail';
import {EventInterface, GET_EVENT_BY_ID } from '../../api/queries/getEvents';

const ActiveEvent: React.FC = (): React.ReactElement => {
  const [event, setEvent] = useState<EventInterface[]>([])
  const { eventID } = useParams();
  const { loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: {
      id: eventID && parseInt(eventID),
    },
    skip: eventID === undefined || isNaN(parseInt(eventID)),
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

  return (
    <>
      {event.length > 0
      ? 
        <div>
          <ActiveEventDetail event={event[0]}/>
        </div>
      : 
        <ErrorPage />
      }
    </>
  )
}
  

export default ActiveEvent