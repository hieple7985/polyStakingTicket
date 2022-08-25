import React, { memo } from 'react'

import '../../../pages/Event/Event.css'

import EventHeaderDetail from '../../Event/EventHeaderDetail'

import CFEDTitle from './CFEventDetailItems/CFEDTitle';
import CFEDProcess from './CFEventDetailItems/CFEDProcess';
import CFEDInfo from './CFEventDetailItems/CFEDInfo';
import { CFEventInterface } from '../../../api/queries/getCFEvent';

interface Props {
  cfEvent: CFEventInterface;
}

const CFEventDetailContent: React.FC<Props> = ({cfEvent}: Props): React.ReactElement => {
  
  return (
    <div className='wrap border-x-only'>
      <div className='container pb-12'>
        <EventHeaderDetail image={cfEvent.image} rootURL="/home" name={cfEvent.name} />
        <div className='w-full'>
          <CFEDTitle cfEvent={cfEvent}/>
        </div>
        <div className='border-b border-solid w-full pb-6 border-gray-200 mt-6'>
          <CFEDProcess cfEvent={cfEvent}/>
        </div>
        <div className='w-full mt-6'>
          <CFEDInfo cfEvent={cfEvent}/>
        </div>
      </div>
    </div>
  )
}

export default memo(CFEventDetailContent)