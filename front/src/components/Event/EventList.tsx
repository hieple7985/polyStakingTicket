import React, { memo } from 'react'


import { EventInterface } from '../../api/queries/getEvents';
import EventListItem from '../ActiveEvent/EventList/EventListItem';

interface Props {
  events?: EventInterface[];
}

const Issued: React.FC<Props> = (props: Props): React.ReactElement => {
  
  return (
    <article className='mb-40'>

      {(props.events && props.events.length > 0) &&
        props.events.map(event => (
          <div key={event.id}>
            <EventListItem event={event} fromEventPage />
          </div>
        ))
      }
    </article>
  )
}

export default memo(Issued)