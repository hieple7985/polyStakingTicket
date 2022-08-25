import React, { memo } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import {ImHome} from 'react-icons/im'
import {FaSearch} from 'react-icons/fa'
import {IoTicket} from 'react-icons/io5'
import {FaUser} from 'react-icons/fa'
import { BsFillCalendarPlusFill } from 'react-icons/bs';

import './Footer.css'

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';

interface Props {
  activePage?: string;
}

const Footer: React.FC<Props> = observer((props: Props): React.ReactElement => {
  const userData = useAccountStore()
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  return (
    <section
      className='fixed-comp fixed bottom-0 pt-5 pb-3 border-t
      border-solid border-gray-300 rounded-t-3xl'
    >
      <div className='w-11/12 flex justify-between items-center'>
        <div id="home">
          <button 
            className={`footer-btn ${props.activePage === 'home' && 'active'}`}
            onClick={() => handleNavigate('/home')}
          >
            <i><ImHome /></i>
            <p className=''>Home</p>
          </button>
        </div>
        <div id="search">
          <button 
            className={`footer-btn ${props.activePage === 'search' && 'active'}`}
            onClick={() => handleNavigate('/search')}
          >
            <i><FaSearch /></i>
            <p className=''>Search</p>
          </button>
        </div>

        <div id="event">
          <button 
            className={`footer-btn ${props.activePage === 'event' && 'active'}`}
            onClick={() => handleNavigate('/event')}
          >
            <i><BsFillCalendarPlusFill /></i>
            <p className=''>Event</p>
          </button>
        </div>

        <div id="tickets">
          <button 
            className={`footer-btn ${props.activePage === 'ticket consumption' && 'active'}`}
            onClick={() => handleNavigate('/issuing_ticket')}
          >
            <i><IoTicket /></i>
            <p>Ticket</p>
          </button>
        </div>
        <div id="account">
          <button 
            className={`footer-btn ${props.activePage === 'user' && 'active'}`}
            onClick={() => handleNavigate(`/user/${userData.store.account?.user}`)}
          >
            <i><FaUser /></i>
            <p>Account</p>
          </button>
        </div>
      </div>
    </section>
    
  )
});

export default memo(Footer)