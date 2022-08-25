import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { NavigateFunction, useParams, useNavigate, useLocation } from 'react-router-dom';
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
import JoinCFEContent from '../../components/Crowdfunding/JoinCFEvent/JoinCFEContent';
import { CFEventInterface } from '../../api/queries/getCFEvent';
import { JOIN_CF } from '../../api/mutations/joinCF';

interface LocationState {
  cfEvent: CFEventInterface;
}

const JoinCFEvent: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore();
  const { id } = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const [amount, setAmount] = useState<string>('');

  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }

  const [joinCF, {loading, error, data}] = useMutation(JOIN_CF);

  const handleJoinCF = (): void => {
    if (locationState.cfEvent.status === 2 && amount && Number.parseInt(amount) > 0) {
      joinCF({
        variables: {
          cfEventID: locationState.cfEvent.id,
          userWallet: userData.store.account.user,
          amount: Number.parseInt(amount),
        }
      })
    }
  }
  
  if (!locationState || error || data.type !== 1) return <Error />
  //TODO: change return massage condition
  if (data) console.log(data);

  return (
    <>
      <div className='wrap border-x-only relative'>
        {loading && <LoadingModal />}
        {data.type === 1 && <CompleteModal />}
        <div className='container'>
          {/* Header */}
          <section className='relative'>
            <SubHeader pageName='Join' rootURL="-1" />
            <div className='absolute h-7 w-7 right-0 top-1/2'>
              <img src={wallets[0].img} alt="Wallet" className='object-cover object-center'/>
            </div>
          </section>
          <section className='mb-56'>
            <JoinCFEContent cfEvent={locationState.cfEvent} amount={amount} setAmount={setAmount}/>
          </section>
          {/* Footer */}
          <section className='fixed-comp sub-footer'>
            <div className='footer-full-w-btn w-11/12'>
              <button 
                className={`primary-btn ${(locationState.cfEvent.status !== 2 || !amount || Number.parseInt(amount) <= 0) && 'disable-button'}`}
                onClick={handleJoinCF}
              >
                Confirm
              </button>
              <button 
                className=' mt-4 secondary-btn' 
                onClick={() => handleNavigate(`/crowdfunding/event/${id}`)}
              >
                Cancel
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
});

export default JoinCFEvent