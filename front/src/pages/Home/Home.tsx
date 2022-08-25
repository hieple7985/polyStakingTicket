import React, { useState } from 'react'

import Header from '../../components/Header/Header';
import Content from '../../components/HomeContent/HomeContent';
import Footer from '../../components/Footer/Footer';
import ModalUser from '../../components/Header/ModalUser';
import ModalWallet from '../../components/Header/ModalWallet';
import CFHomeContent from '../../components/Crowdfunding/CFHomeContent';

const Home: React.FC = (): React.ReactElement => {
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);


  return (
    <div className='wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal}/>
      )}
      
      <section id="header" className='fixed-comp fixed top-0'>
        <div className='w-11/12'>
          <Header setWalletModal={setWalletModal} setUserModal={setUserModal}/>
        </div>
      </section>
      <div className='container relative'>
        <section id="content" className='relative mt-20 mb-32'>
          <CFHomeContent />
          <Content type='Categories' />
          <Content type='Newest Event' />
          <Content type='Expiring Soon' />
        </section>
      </div>
      
      <Footer activePage='home'/>
    </div>
  )
}

export default Home