import React, { memo, useState } from 'react'
import { useQuery } from '@apollo/client';
import CFEventSlider from './CFEvent/CFEventSlider'
import CFHeader from './CFHeader'

import './CF.css'
import { CFEventInterface, GET_UPCOMING_AND_PROGRESSING_CF_EVENTS } from '../../api/queries/getCFEvent';
import LoadingField from '../LoadingField/LoadingField';

const CFHomeContent: React.FC = (): React.ReactElement => {
  const [cfEvents, setCFEvents] = useState<CFEventInterface[]>([]);
  const {loading, error} = useQuery(GET_UPCOMING_AND_PROGRESSING_CF_EVENTS, {
    onCompleted: (data) => {
      setCFEvents(data.cfEvents);
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <section className='mt-6'>
      <CFHeader />
      {loading
      ? <LoadingField />
      : error
        ? <p>Error: Cannot load data!</p>
        : <CFEventSlider cfEvents={cfEvents} />
      }
    </section>
  )
}

export default memo(CFHomeContent)