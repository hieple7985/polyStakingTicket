import React, { memo } from 'react'

import EventListItem from './EventListItem';
import LoadingField from '../../LoadingField/LoadingField';
import { EventInterface } from '../../../api/queries/getEvents';

interface Props {
  events: EventInterface[];
  ownerAddress?: string;
  loading?: boolean;
}

const EventList: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
    {props.loading
    ?
      <p className='mt-12'><LoadingField /></p>
    :
      <>
        {props.events.length > 0 && 
          <div id="ticket-list-wrap">
            {props.events 
            ? props.events.map(event => (
              <div key={event.id}>
                <EventListItem event={event} ownerAddress={props.ownerAddress}/>
              </div>
            ))
            : <div>Error 404!</div>
          }
          </div>
      }
      </>
    }
    </>
  )
}

export default memo(EventList)