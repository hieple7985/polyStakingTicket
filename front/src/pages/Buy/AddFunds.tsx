import React from 'react'
import { useLocation } from 'react-router-dom';

import SubHeader from '../../components/SubHeader/SubHeader'
import AddFundsContent from '../../components/BuyContent/AddFundsContent';
import ErrorPage from '../../components/Error/Error';
import wallets from '../../data/wallets';
import { TicketInterface } from '../../api/queries/getTickets';

interface LocationState {
  ticket: TicketInterface,
}

const AddFunds: React.FC = (): React.ReactElement => {
  console.log("Add funds")
  const location = useLocation();
  const locationState = location.state as LocationState;
  if (locationState) {
    return (
      <div className='wrap border-x-only'>
        <div className='container'>
          {/* Header */}
          <section className='relative'>
            <SubHeader pageName='Add Funds To Purchase' rootURL="-1" />
            <div className='absolute h-7 w-7 right-0 top-1/2'>
              <img src={wallets[0].img} alt="Wallet" className='object-cover object-center'/>
            </div>
          </section>
          <section>
            <AddFundsContent totalPrice={locationState.ticket.price} walletImg={wallets[0].img} walletName={wallets[0].name}/>
          </section>
          {/* Footer */}
          <section className='fixed-comp sub-footer'>
            <div className='footer-full-w-btn w-11/12'>
              <button className='primary-btn'>
                Continue
              </button>
              <button className=' mt-4 secondary-btn'>
                Add funds
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
  else return <ErrorPage />
}

export default AddFunds