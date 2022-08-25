import React, {memo} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TicketInterface } from '../../../api/queries/getTickets'


interface Props {
  ticket: TicketInterface
}

const BoughtFooter: React.FC<Props> = ({ticket}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }


  const handleNavigateWWithTicket = (url: string, ticket: TicketInterface): void => {
    console.log(url, ticket);
    
    navigate(url, {state: {ticket: ticket}});
  }

  return (
    <section 
      className='fixed-comp sub-footer'
    >
      <div className='footer-full-w-btn w-11/12'>
        <button 
          className='primary-btn'
          onClick={() => handleNavigateWWithTicket('qr_code', ticket)}
        >
          Show QR Code
        </button>
        <div className='flex mt-4'>
          <button 
            className={`secondary-btn ${ticket.status === 1 && 'disable-button'}`}
            onClick={() => handleNavigateWWithTicket('sell', ticket)}
          >
            Sell
          </button>
          <button 
            className='secondary-btn ml-3'
            onClick={() => handleNavigateWWithTicket('transfer', ticket)}
          >
            Transfer
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(BoughtFooter)