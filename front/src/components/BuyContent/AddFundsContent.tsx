import { observer } from 'mobx-react-lite';
import React, { memo } from 'react'
import { useAccountStore } from '../../context/AccountProvider'

interface Props {
  totalPrice: number,
  walletImg: string,
  walletName: string,
}

const AddFundsContent: React.FC<Props> = observer(({totalPrice, walletImg, walletName}: Props): React.ReactElement => {
  const userData = useAccountStore();

  return (
    <>
      {/* Introduction */}
      <article className='mt-8 text-center'>
        <h6 className='text-lg font-semibold'>
          You need <span className='text-primaryColor'>{totalPrice} MATIC</span> to buy ticket
        </h6>
        <div className='text-sm mt-3'>
          <p>Please transfer money to your wallet.</p>
          <p>It can take up to a minute for your balance to update.</p>
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
        <div className='flex border border-solid rounded-3xl w-full pl-6 pr-2 mt-4
        border-whiteSmoke bg-inputBgColor select-none'
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

export default memo(AddFundsContent)