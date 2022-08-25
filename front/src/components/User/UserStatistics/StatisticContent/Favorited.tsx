import { observer } from 'mobx-react-lite';
import React, { memo } from 'react'
import { FavouriteTicketListInterface } from '../../../../api/queries/getFavouriteTicketList';
import TicketListItem from '../../../Tickets/TicketList/TicketListItem';

interface Props {
  favouriteTickets?: FavouriteTicketListInterface[];
}

const Favorited: React.FC<Props> = observer(({favouriteTickets}: Props): React.ReactElement => {

  return (
    <article className='mb-36 mt-10'>
      {favouriteTickets
        ? 
          <>
            {favouriteTickets.map(favourite => (
              <div key={favourite.id}>
                <TicketListItem ticket={favourite.ticket} eventID={favourite.ticket.event.id} favouriteTicketList={favouriteTickets}/>
              </div>
            ))}
          </>
        : <div className='stat-null'>You haven’t liked any ticket yet.</div>
      }
    </article>
  )
})

export default memo(Favorited)