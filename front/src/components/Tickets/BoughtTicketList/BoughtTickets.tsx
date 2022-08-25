import React, { memo } from 'react'
import { FavouriteTicketListInterface } from '../../../api/queries/getFavouriteTicketList';
import { TicketInterface } from '../../../api/queries/getTickets'

import BoughtTicketsItem from './BoughtTicketsItem';

interface Props {
  tickets: TicketInterface[];
  favouriteTicketList?: FavouriteTicketListInterface[];
}

const BoughtTickets: React.FC<Props> = ({tickets, favouriteTicketList}: Props): React.ReactElement => {
  return (
    <>
      {tickets
      ?
        tickets.map(ticket => (
          <div key={ticket.id}>
            <BoughtTicketsItem ticket={ticket} favouriteTicketList={favouriteTicketList}/>
          </div>
        ))
      :
        <div>Error: Cannot load tickets!</div>
      }
    </>
  )
}

export default memo(BoughtTickets)