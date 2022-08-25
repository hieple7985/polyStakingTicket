import React, { memo, useState } from 'react'
import { observer } from 'mobx-react-lite';

import { useAccountStore } from '../../../context/AccountProvider'

import wallets from '../../../data/wallets';
import { CFEventInterface } from '../../../api/queries/getCFEvent';

interface Props {
  cfEvent: CFEventInterface;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}

const JoinCFEContent: React.FC<Props> = observer(({cfEvent, amount, setAmount}: Props): React.ReactElement => {
  const userData = useAccountStore();
  

  const checkCurrentAmount = (value: string): void => {
    if (Number.parseInt(value) > (cfEvent.totalRaise - cfEvent.currentRaise)) {
      setAmount((cfEvent.totalRaise - cfEvent.currentRaise).toString());
    }
    else setAmount(value)
  }
  return (
    <>
      {/* Introduction */}
      <article className='mt-8 text-center'>
        <h6 className='text-lg font-semibold'>
          You need to enter the total number of tickets you want to buy 
          and click the confirm button below to confirm this transaction.
        </h6>
      </article>

      <article className='w-full text-center mt-10 h-6 overflow-hidden'>
        {amount &&
          <p className='text-xl font-semibold'>
            You need 
            <span className='text-primaryColor mx-1'>{(Number.parseInt(amount) * cfEvent.fundingPrice).toFixed(2)} MATIC</span> 
            to buy {amount} {Number.parseInt(amount) < 2 ? "ticket" : "tickets"}
          </p>
        }
      </article>

      {/* Funding Ticket Quantity */}
      <article className='mt-8'>
        <div className='flex justify-between text-sm'>
          <div className='font-semibold'>Total ticket (1 Ticket = {cfEvent.fundingPrice} MATIC):</div>
        </div>
        <div className={`input mt-2 ${amount && 'active'}`}
        >
          <input 
            type="number"
            placeholder="Set ticket's amount"
            value={amount}
            onChange={(e) => checkCurrentAmount(e.target.value)}
          />
          <p></p>
        </div>
      </article>

      {/* Wallet Input */}
      <article className='mt-8'>
        <div className='flex justify-between text-sm'>
          <div className='font-semibold'>Your {wallets[0].name} wallet:</div>
          <div>
            Balance: <span>{Number(userData.store.account.balance).toFixed(2)} MATIC</span>
          </div>
        </div>
        <div className='input-read-only'
        >
          <input 
            type="text" 
            className='py-2 bg-transparent flex-1 min-w-0 text-gray-400 font-semibold' 
            value={userData.store.account.user}
            readOnly
          />
        </div>
      </article>

      {/* Wallet Logo */}
      <article className='w-full flex justify-center mt-16'>
        <img src={wallets[0].img} alt="Wallet" className='h-40 w-40 opacity-50'/>
      </article>
    </>
  )
});

export default memo(JoinCFEContent)