import { useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { CREATE_EXCHANGE } from '../../api/mutations/createExchange';
import { TicketInterface } from '../../api/queries/getTickets';

import SubHeader from '../../components/SubHeader/SubHeader'
import TransferTicket from '../../components/TransferTicket/TransferTicket';
import Process from './Process';
import ErrorPage from '../../components/Error/Error'

interface LocationState {
  ticket: TicketInterface;
}

const Transfer: React.FC = (): React.ReactElement => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const [address, setAddress] = useState<string>('');
  const [exchangeStatus, setExchangeStatus] = useState<boolean>(false);

  const [createExchange, { data, loading, error }] = useMutation(CREATE_EXCHANGE);
  const handleTransfer = (): void => {
    setExchangeStatus(true)
    createExchange({
      variables: {
        owner_address: address,
        ticket_id: locationState.ticket.id,
        create_at: moment().format('YYYY/MM/DD')
      }
    })
  }
  return (
    <>
      {locationState || error
        ?
        <>
          {
            !exchangeStatus  ?
              <div className='wrap border-x-only'>
                <section className='container'>
                  <SubHeader pageName="Transfer Your Ticket" rootURL="-1" />
                  <div className='w-full mt-10'>
                    <TransferTicket address={address} setAddress={setAddress} />
                  </div>
                </section>
                <section className='fixed-comp sub-footer'>
                  <div className='footer-full-w-btn w-11/12'>
                    <button
                      className={`primary-btn ${address || 'disable-button'}`}
                      onClick={handleTransfer}
                    >
                      Transfer
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

export default Transfer;