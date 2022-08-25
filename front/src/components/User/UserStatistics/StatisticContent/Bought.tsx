import React, { memo } from 'react'
import { FavouriteTicketListInterface } from '../../../../api/queries/getFavouriteTicketList';
import { TicketInterface } from '../../../../api/queries/getTickets';
import BoughtTickets from '../../../Tickets/BoughtTicketList/BoughtTickets';


interface Props {
  tickets?: TicketInterface[];
  favouriteTicketList?: FavouriteTicketListInterface[];
}

const Bought: React.FC<Props> = ({tickets, favouriteTicketList}: Props): React.ReactElement => {
  return (
    <article className='mb-36 mt-10'>
      {tickets && tickets.length > 0
        ?
          <BoughtTickets tickets={tickets} favouriteTicketList={favouriteTicketList}/>
        : 
          <div className='stat-null'>You haven’t bought any ticket yet.</div>
      }
    </article>
  )
}

export default memo(Bought)