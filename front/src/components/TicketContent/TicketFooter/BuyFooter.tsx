import React, {memo} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TicketInterface } from '../../../api/queries/getTickets'


interface Props {
  ticket: TicketInterface
}

const BuyFooter: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const buyable = true;
  const handleNavigate = (): void => {
    if (buyable)
      navigate(`/active_event/${ticket.event.id}/ticket/${ticket.id}/confirm`, {state: {ticket: ticket}});
    else
      navigate(`/active_event/${ticket.event.id}/ticket/${ticket.id}/add_funds`, {state: {ticket: ticket}});
  }
  return (
    <section 
      className='fixed-comp sub-footer'
    >
      <div className='footer-full-w-btn w-11/12'>
        <button 
          className='primary-btn'
          onClick={handleNavigate}
        >
          Buy Ticket
        </button>
      </div>
    </section>
  )
}

export default memo(BuyFooter)