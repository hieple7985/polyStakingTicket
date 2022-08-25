import React from 'react'
import { CFEventInterface } from '../../api/queries/getCFEvent'
import CFEventList from '../Crowdfunding/CFEvent/CFEventList'
import EventNotFound from './EventNotFound'

interface Props {
  cfEvents: CFEventInterface[];
}

const CrowdfundingEvents: React.FC<Props> = ({cfEvents}: Props): React.ReactElement => {
  return (
    <article>
      {cfEvents.length > 0 
      ?
        // Crowdfunding event list
        
          <CFEventList cfEvents={cfEvents}/>
        
      :
        // No crowdfunding event found screen
        <EventNotFound eventType={2} redirectURL='/crowdfunding/event/create'/>
      }
    </article>
  )
}

export default CrowdfundingEvents