import React, { memo } from 'react'
import CFEventItem from './CFEventItem'
import { CFEventInterface } from '../../../api/queries/getCFEvent';

interface Props {
  cfEvents: CFEventInterface[];
}

const CFEventList: React.FC<Props> = ({cfEvents}: Props): React.ReactElement => {
  return (
    <>
      {cfEvents.map((cfEvent) => (
        <div key={cfEvent.id} className='w-full mt-6' >
          <CFEventItem cfEvent={cfEvent}/>
        </div>
      ))}
    </>
  )
}

export default memo(CFEventList)