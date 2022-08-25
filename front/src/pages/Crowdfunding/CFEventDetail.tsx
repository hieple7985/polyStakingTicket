import React, { useState } from 'react'
import CFEventDetailContent from '../../components/Crowdfunding/CFEvent/CFEventDetailContent'
import { useQuery } from '@apollo/client';
import { GET_CF_EVENTS_BY_ID, CFEventInterface } from '../../api/queries/getCFEvent';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { useParams } from 'react-router-dom';

const CFEventDetail: React.FC = (): React.ReactElement => {
  const {id} = useParams();
  const [cfEvents, setCFEvents] = useState<CFEventInterface[]>([])
  const { loading, error } = useQuery(GET_CF_EVENTS_BY_ID, {
    variables: {
      id: Number(id),
    },
    onCompleted: (data) => {
      setCFEvents(data.cfEvents);
    },
    fetchPolicy: 'no-cache',
  })

  if (loading) return <Loading />
  if (error) {
    console.log(error);
    return <Error />
  }


  return (
    <>
      {cfEvents.length > 0
      ?
        <CFEventDetailContent cfEvent={cfEvents[0]}/>
      :
        <Error />
      }
    </>
  )
}

export default CFEventDetail