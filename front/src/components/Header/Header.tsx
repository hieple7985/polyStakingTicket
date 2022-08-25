import React, { memo } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { RiWallet3Fill } from 'react-icons/ri'
import { RiQrScan2Line } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5';

import IMG_LOGO from '../../assets/images/main_logo.png'

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import './Header.css'

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';


interface Props {
  isUserPage?: boolean;
  setWalletModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = observer((props: Props): React.ReactElement => {
  const userData = useAccountStore()
  // const userData = localStorage.getItem('user');
  // const user: UserInfo = userData && JSON.parse(userData);
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  return (
    <div className='home-header flex justify-between h-12 items-center my-6'>
      <div className='header-left-items h-full flex items-center'>
        <article id="logo">
          <button
            type="button"
            className='flex items-center'
            onClick={() => handleNavigate('/home')}
          >
            <img src={IMG_LOGO} alt="Poly Ticket" className='h-12 w-12' />
            <p className='text-lg text-primaryColor font-bold select-none leading-5 w-24 ml-2 text-left'>
              Poly Staking Ticket
            </p>
          </button>
        </article>
      </div>
      {props.isUserPage
        ?
        <div className="header-right-items">
          <article id="header-user-setting" className='h-5/6'>
            <button onClick={() => handleNavigate("settings")}>
              <i className='text-primaryColor text-xl'><IoSettingsSharp /></i>
            </button>
          </article>
        </div>
        :
        <div className="header-right-items">
          <article>
            <button className='header-scan' onClick={() => handleNavigate("/scan")}>
              <i><RiQrScan2Line /></i>
            </button>
          </article>
          <article>
            <button
              className='header-wallet-overview'
              onClick={() => props.setWalletModal && props.setWalletModal(true)}
            >
              <i><RiWallet3Fill /></i>
            </button>
          </article>
          <article id="header-user-overview">
            <button className='user-avt-btn' onClick={() => props.setUserModal && props.setUserModal(true)}>
              <div className='icon-wallet-custom'>
                <Jazzicon diameter={100} seed={jsNumberForAddress(userData.store.account.user)} />
              </div>
              {/* <img src={userData.store.account && userData.store.account.img} alt="User"/> */}
            </button>
          </article>
        </div>
      }
    </div>
  )
});

export default memo(Header)