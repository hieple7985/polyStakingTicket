import React from 'react'
import { Link } from 'react-router-dom'

import './Welcome.css'
import IMG_LOGO from '../../assets/images/main_logo.png'

import { useAccountStore } from '../../context/AccountProvider';
import LoadingField from '../../components/LoadingField/LoadingField';
import { observer } from 'mobx-react-lite';

const Welcome: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()
  const isLogin = localStorage.getItem('_NTS_V4_isLogin')
  return (
    <div className='welcome-bg min-h-screen relative bg-no-repeat	bg-cover bg-center'>
      <div className="absolute inset-0 bg-black opacity-40 z-0">
      </div>
      {/* Container */}
      <div className='container relative z-50'>

        {/* Logo */}
        <div className='flex-1 flex justify-center items-center w-2/5'>
          <img src={IMG_LOGO} alt="Logo" />
        </div>

        {/* Welcome line */}
        <div className='text-center font-semibold'>
          <p
            id="greeting"
            className='text-white text-2xl'
          >
            Welcome to
          </p>
          <h1
            id="title"
            className='welcome-title text-primaryColor text-3xl mt-2'
          >
            Poly Staking Ticket
          </h1>
        </div>

        {/* Next button */}
        <div id="next-btn" className='w-full mt-12 mb-20'>
          <Link
            to={userData.store.account.user && JSON.parse(isLogin === null ? 'false' : isLogin) ? '/home' : '/login'}
            className={`${!userData.store.account.fetch && 'disable-button'} text-white bg-primaryColor block w-full text-3xl rounded-2xl py-4
            cursor-pointer font-semibold hover:bg-white hover:text-primaryColor text-center`}
          >
            {
              userData.store.account.fetch ?
                'NEXT'
                :
                <LoadingField />
            }
          </Link>
        </div>
      </div>
    </div>
  )
});

export default Welcome