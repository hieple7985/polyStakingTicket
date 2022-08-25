import React, { memo } from 'react'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketPrice from './OverviewItem/TicketPrice'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'
import TicketFavouriteDetails from '../Details/TicketFavouriteDetails'
import TicketPriceUSD from './OverviewItem/TicketPriceUSD'
import { useAccountStore } from '../../../context/AccountProvider';
import { observer } from 'mobx-react-lite'
import { TicketInterface } from '../../../api/queries/getTickets'

interface Props {
  ticket: TicketInterface;
  hideFavourite?: boolean;
}

const TicketOverview: React.FC<Props> = observer(({ticket, hideFavourite}: Props): React.ReactElement => {
  const userData = useAccountStore();

  return (
    <section className='w-full mt-6'>
      <article className='text-sm font-semibold'>
        <TicketCategories categories={ticket.event.eventCategories} isFull={true} />  
      </article>
      <article className='mt-4 text-3xl font-semibold'>
        <TicketTitle name={ticket.event.name} />
      </article>
        <article className='flex w-full justify-between mt-6'>
          <div className='overview-ticket-usage flex flex-col '>
            <div>
              <small className='text-gray-600 text-base'>
                #Owned by  
                <span className='text-primaryColor font-semibold ml-1'>
                  {ticket.ticketOwner === userData.store.account.user 
                  ? 
                    "you" 
                  : 
                    ticket.ticketOwner.substring(0, 8) + '...' + ticket.ticketOwner.substring(ticket.ticketOwner.length - 8, ticket.ticketOwner.length)}
                </span>
              </small>
            </div>
          </div>
        </article>
      <article className='flex w-full justify-between items-start mt-6'>
        {ticket.event.owner !== userData.store.account.user &&
          <div >
            <TicketFavouriteDetails hideFavourite={hideFavourite} ticketID={ticket.id}/>
          </div>
        }
        <div className='flex-1 text-right '>
          <div className='text-3xl font-bold '>
            <TicketPrice price={ticket.price} />
            <TicketPriceUSD price={ticket.price} />
          </div>
        </div>
      </article>
    </section>
  )
});

export default memo(TicketOverview)