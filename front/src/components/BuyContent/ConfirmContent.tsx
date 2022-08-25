import React, { memo } from 'react'
import { useAccountStore } from '../../context/AccountProvider'
import { observer } from 'mobx-react-lite';

interface Props {
  totalPrice: number,
  walletImg: string,
  walletName: string,
}

const ConfirmContent: React.FC<Props> = observer(({totalPrice, walletImg, walletName}: Props): React.ReactElement => {
  const userData = useAccountStore()

  return (
    <>
      {/* Introduction */}
      <article className='mt-8 text-center'>
        <h6 className='text-lg font-semibold'>
          You need <span className='text-primaryColor'>{totalPrice} MATIC</span> to buy ticket
        </h6>
        <div className='text-sm mt-3'>
          <p>Press Confirm to buy this ticket.</p>
          <p>It may take a minute to complete your order.</p>
        </div>
      </article>

      {/* Wallet Input */}
      <article className='mt-8'>
        <div className='flex justify-between text-sm'>
          <div className='font-semibold'>Your {walletName} wallet:</div>
          <div>
            Balance: <span>{Number(userData.store.account.balance).toFixed(3)} MATIC</span>
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
        <img src={walletImg} alt="Wallet" className='h-40 w-40 opacity-50'/>
      </article>
    </>
  )
});

export default memo(ConfirmContent)