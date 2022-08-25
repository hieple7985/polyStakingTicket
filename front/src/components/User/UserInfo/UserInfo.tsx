import React, {memo, useEffect, useState} from 'react'
import {BiCopy} from 'react-icons/bi'
import { useAccountStore } from '../../../context/AccountProvider'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import './UserInfo.css'
import { observer } from 'mobx-react-lite'

const UserInfomation: React.FC= observer((): React.ReactElement => {
  const userData = useAccountStore()
  const [copy, setCopy] = useState<boolean>(false)

  const handleCopy = ():void => {
    if (!copy) {
      navigator.clipboard.writeText(userData.store.account.user);
      setCopy(true);
    }
  }

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);
  return (
    <>
      <div className=' rounded-full overflow-hidden '>
        <Jazzicon  diameter={100} seed={jsNumberForAddress(userData.store.account.user)} />
        {/* <img src={user.img} alt="User Avatar" className='object-cover w-32 h-32 object-center'/> */}
      </div>
      <div className='flex mt-6 items-center'>
        <p className='text-sm text-primaryColor font-semibold'>
          {userData.store.account.user}
        </p>
        <button 
          className='ml-3 text-xl opacity-60 hover:opacity-80'
          onClick={handleCopy}
        >
          <i><BiCopy /></i>
        </button>
      </div>
      {copy && 
        <div>
          <p className='copy-notif font-semibold text-primaryColor text-lg'>Copied to Clipboard!</p>
        </div>
      }
    </>
  )
});

export default memo(UserInfomation)