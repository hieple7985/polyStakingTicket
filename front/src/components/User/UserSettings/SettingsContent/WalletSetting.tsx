import React, { memo, useState, useEffect } from 'react'
import {BsCheckLg} from 'react-icons/bs'
import {BiCopy} from 'react-icons/bi'

// import IMG_TETHER from '../../../../assets/images/icon-tether.png'
import IMG_POLYGON from '../../../../assets/images/icon-polygon.png'

import SubHeader from '../../../SubHeader/SubHeader'

import wallets from '../../../../data/wallets'
import { useParams } from 'react-router-dom';
import ErrorPage from '../../../Error/Error'
import { useAccountStore } from '../../../../context/AccountProvider'

import '../../UserInfo/UserInfo.css'
import { observer } from 'mobx-react-lite'
import { EXCHANGE_CURRENCY } from '../../../../api/mutations/exchangeCurrency'
import { useMutation } from '@apollo/client'

const WalletSetting: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()
  const [copy, setCopy] = useState<boolean>(false)
  const {userName} = useParams();
  const [realMoneyPrice, setRealMoneyPrice] = useState<number>(0);
  const [exchangeCurrency, {loading, error}] = useMutation(EXCHANGE_CURRENCY)
  
  const handleCopy = ():void => {
    if (!copy) {
      navigator.clipboard.writeText(userData.store.account.user);
      setCopy(true);
    }
  }

  useEffect(() => {
    exchangeCurrency({
      variables: {
        currency: Number(userData.store.account.balance),
      },
      onCompleted: (data) => {
        setRealMoneyPrice(data.exchangeCurrency.currency);
      }
    })
  }, [])

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);
  

  if (userData.store.account.user !== userName) return <ErrorPage />

  if (error) console.log(error);

  return (
    <div className='wrap border-x-only'>
      <div className='container relative'>
        <section>
          <SubHeader pageName='My Wallet' rootURL={`/user/${userName}/settings`} />
        </section>
        <section className='wallet-setting-section'>
          {wallets.map(wallet => (
            <article
              key={wallet.id}
              className={wallet.available ? 'flex justify-between items-center cursor-pointer mt-6' : 'hidden'}
            >
              <div className='flex items-center'>
                <img src={wallet.img} alt={wallet.name} className="object-cover h-8" />
                <p className='ml-2 font-semibold'>{wallet.name.toUpperCase()}</p>
              </div>
              <div>
                <i className='text-primaryColor'><BsCheckLg /></i>
              </div>
            </article>
          ))}
        </section>
        <section className='wallet-setting-section'>
          <h6 className=''>Wallet Address:</h6>
          <div className='flex justify-between items-center mt-1'>
            <p className='text-primaryColor'>{userData.store.account.user}</p>
            <button 
              className='hover:text-primaryColor'
              onClick={handleCopy}
            >
              <i className='text-xl'><BiCopy /></i>
            </button>
          </div>
          {copy && 
            <div className='w-full text-center'>
              <p className='copy-notif font-semibold text-primaryColor text-lg'>Copied to Clipboard!</p>
            </div>
          }
        </section>
        <section className='wallet-setting-section'>
          <h6 className='mt-6 font-semibold text-lg'>Balance:</h6>
          <div className='balance-items'>
            {/* TODO: change flexible data */}
            <div className='mt-3 flex justify-between items-start'>
              <div className='flex items-center'>
                <img src={IMG_POLYGON} alt="Polygon" className='object-cover h-6'/>
                <p className='ml-3 text-lg'>Polygon</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold'>{Number.isInteger(userData.store.account.balance) ? Number(userData.store.account.balance) : Number(userData.store.account.balance).toFixed(4)}<span> MATIC</span></p>
                {loading 
                ?
                  <p>...</p>
                :
                  (error 
                  ? 
                    <></>
                  :
                    <p className='ml-3 text-sm text-gray-500'>({Number.isInteger(realMoneyPrice) ? realMoneyPrice : realMoneyPrice.toFixed(4)} $)</p> 
                  )
                }
              </div>
            </div>

            {/* Disabled: Hiep Le */}
            {/* <div className='mt-3 flex justify-between items-start'>
              <div className='flex items-center'>
                <img src={IMG_TETHER} alt="Tether" className='object-cover h-6'/>
                <p className='ml-3 text-lg'>Tether</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold'>0.000<span> USDT</span></p>
                <p className='ml-3 text-sm text-gray-500'>(0 $)</p>
              </div>
            </div> */}

            {/* <div className='mt-3 flex justify-between items-start'>
              <div className='flex items-center'>
                <img src={IMG} alt="Etherum" className='object-cover h-6'/>
                <p className='ml-3 text-lg'></p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold'>0.000<span> MATIC</span></p>
                <p className='ml-3 text-sm text-gray-500'>(0 $)</p>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  )
});

export default memo(WalletSetting)