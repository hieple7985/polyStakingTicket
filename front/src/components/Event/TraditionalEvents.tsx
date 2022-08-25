import React from 'react'
import { Checkbox } from '@mui/material';
import { EventInterface } from '../../api/queries/getEvents';
import EventList from './EventList';
import EventNotFound from './EventNotFound';

interface Props {
  events: EventInterface[];
  isCheck: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const TraditionalEvents: React.FC<Props> = ({events, isCheck, setCheck}: Props): React.ReactElement => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheck(true);
    }
    else {
      setCheck(false);
    }
  }

  return (
    <article>
      {/* Hide expired events checkbox */}
      {(events.length > 0 || isCheck) &&
        <>
          <div className='flex mt-6'>
            <label className='text-lg flex items-center cursor-pointer'>
              <Checkbox checked={isCheck} size="small" onChange={(e) => handleCheck(e)}/>
              Hide expired events
            </label>
            <div className='flex-1'></div>
          </div>
          
        </>
      }
      {/* Traditional event list */}
      {events.length > 0
      ?
        <EventList events={events} />
      :
        isCheck
        ?
          <div className='mt-6 text-2xl text-gray-500 font-semibold w-full text-center'>
            You don&apos;t have any active event!
          </div>
        :
          // No traditional event found screen
          <EventNotFound eventType={1} redirectURL='/event/create_event'/>
      }
    </article>
  )
}

export default TraditionalEvents