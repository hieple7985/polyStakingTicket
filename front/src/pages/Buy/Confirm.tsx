import React from 'react'
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { NavigateFunction, useParams, useNavigate, useLocation } from 'react-router-dom';
import ConfirmContent from '../../components/BuyContent/ConfirmContent';
import ErrorPage from '../../components/Error/Error';
import SubHeader from '../../components/SubHeader/SubHeader';
import { useMutation } from '@apollo/client';
import LoadingModal from '../../components/BuyContent/LoadingModal';
import CompleteModal from '../../components/BuyContent/CompleteModal';

import { useAccountStore } from '../../context/AccountProvider';
import { CREATE_BUY_TICKET } from '../../api/mutations/createBuyTicket';
import wallets from '../../data/wallets';

import { TicketInterface } from '../../api/queries/getTickets';
import Error from '../../components/Error/Error';

interface LocationState {
  ticket: TicketInterface
}


const Confirm: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()

  const { eventID } = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }

  const [createBuyTicket, { loading, error, data }] = useMutation(CREATE_BUY_TICKET);

  const handleBuyTicket = (): void => {
    createBuyTicket({
      variables: {
        transactionID: locationState.ticket.transactions[0].id,
        userID: userData.store.account.id,
        ticketID: locationState.ticket.id,
        ownerAddress: userData.store.account.user,
        create_at: moment().format('YYYY/MM/DD')
      }
    })
  }

  if (error) {
    console.log(error)
    return <Error />
  }

  if (locationState) {
    return (
      <div className='wrap border-x-only relative'>
        {loading && <LoadingModal />}
        {data && <CompleteModal />}
        <div className='container'>
          {/* Header */}
          <section className='relative'>
            <SubHeader pageName='Confirm' rootURL="-1" />
            <div className='absolute h-7 w-7 right-0 top-1/2'>
              <img src={wallets[0].img} alt="Wallet" className='object-cover object-center'/>
            </div>
          </section>
          <section className='mb-56'>
            <ConfirmContent totalPrice={locationState.ticket.price} walletName={wallets[0].name} walletImg={wallets[0].img}/>
          </section>
          {/* Footer */}
          <section className='fixed-comp sub-footer'>
            <div className='footer-full-w-btn w-11/12'>
              <button className='primary-btn' onClick={handleBuyTicket}>
                Confirm
              </button>
              <button className=' mt-4 secondary-btn' onClick={() => handleNavigate(`/active_event/${eventID}`)}>
                Cancel
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
  else return <ErrorPage />
});

export default Confirm