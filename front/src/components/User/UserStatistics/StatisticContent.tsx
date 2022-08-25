import React, { memo } from 'react'

import Issued from './StatisticContent/Issued';
import Bought from './StatisticContent/Bought';
import Crowdfunding from './StatisticContent/Crowdfunding';
import Favorited from './StatisticContent/Favorited';


import './StatisticContent.css'
import { EventInterface } from '../../../api/queries/getEvents';
import { TicketInterface } from '../../../api/queries/getTickets';
import { FavouriteTicketListInterface } from '../../../api/queries/getFavouriteTicketList';
import { CFEventInterface } from '../../../api/queries/getCFEvent';


interface Props {
  statType: string;
  cfType: number;
  setCFType: React.Dispatch<React.SetStateAction<number>>;
  issuedEvents: EventInterface[];
  boughtTickets: TicketInterface[];
  favouriteTickets: FavouriteTicketListInterface[];
  cfEvents: CFEventInterface[];
}

const StatisticContent: React.FC<Props> = (props: Props): React.ReactElement => {
  if (props.statType === 'issued') {
    return (props.issuedEvents.length > 0 
    ? <Issued events={props.issuedEvents} /> 
    : <Issued />)
  }
  
  else if (props.statType === 'bought') {
    return (props.boughtTickets.length > 0 
    ? <Bought tickets={props.boughtTickets} favouriteTicketList={props.favouriteTickets}/> 
    : <Bought />)
  }
  else if (props.statType === 'crowdfunding') {
    return (props.cfEvents.length > 0 
    ? <Crowdfunding cfEvents={props.cfEvents} cfType={props.cfType} setCFType={props.setCFType} /> 
    : <Crowdfunding cfType={props.cfType} setCFType={props.setCFType}/>)
  }
  else if (props.statType === 'favorited') {
    return (props.favouriteTickets.length > 0 
    ? <Favorited favouriteTickets={props.favouriteTickets}/> 
    : <Favorited />);
  }
  else return (
    <div>Error! </div>
  )
}
export default memo(StatisticContent)
