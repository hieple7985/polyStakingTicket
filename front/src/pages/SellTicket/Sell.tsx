import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import SubHeader from '../../components/SubHeader/SubHeader';
import ErrorPage from '../../components/Error/Error'
import { TicketInterface } from '../../api/queries/getTickets';
import SellTicketContent from '../../components/SellTicket/SellTicketContent';
import { useMutation } from '@apollo/client';
import { CREATE_SELL_TICKET } from '../../api/mutations/createSellTicket';
import Process from './Process';

interface LocationState {
  ticket: TicketInterface;
}

const Sell: React.FC = (): React.ReactElement => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const [price, setPrice] = useState<string>('');
  const [sellStatus, setSellStatus] = useState<boolean>(false);

  const [createSellTicket, { data, loading, error }] = useMutation(CREATE_SELL_TICKET);

  const handleSellTicket = (): void => {
    if (locationState.ticket.status !== 1 && price && Number.parseInt(price) > 0) {
      setSellStatus(true)
      createSellTicket({
        variables: {
          id: locationState.ticket.id,
          price: price,
        }
      })
    }
  }

  console.log(data);
  return (
    <>
      {locationState || error
        ?
        <>
          {
            !sellStatus ?
              <div className='wrap border-x-only'>
                <section className='container'> 
                  <SubHeader pageName="Sell Your Ticket" rootURL="-1" />
                  <div className='w-full mt-10'>
                    <SellTicketContent price={price} setPrice={setPrice}/>
                  </div>
                </section>
                <section className='fixed-comp sub-footer'>
                  <div className='footer-full-w-btn w-11/12'>
                    <button
                      className={`primary-btn ${(locationState.ticket.status === 1 || !price || Number.parseInt(price) <= 0) && 'disable-button'}`}
                      onClick={handleSellTicket}
                    >
                      Sell
                    </button>
                  </div>
                </section>
              </div>
              :
              <Process loading={loading} data={data} />
          }
        </>
        :
        <ErrorPage />
      }
    </>
  )
}

export default Sell