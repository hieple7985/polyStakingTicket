import React, { useState } from 'react'

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalUser from '../../components/Header/ModalUser';
import ModalWallet from '../../components/Header/ModalWallet';
import IssuingStepContent from '../../components/IssuingTicket/IssuingStepContent';
import IssuingStepHeader from '../../components/IssuingTicket/IssuingStepHeader';


const IssuingTicket: React.FC = (): React.ReactElement => {
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
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
      <div className='container'>
        <section className='relative mt-28'>
          <div>
            <IssuingStepHeader step={step} setStep={setStep} />
          </div>
          <div className='mt-10 w-3/4 mx-auto text-center text-sm font-semibold'>
            <p>Fill in the fields to create a ticket. </p>
            <p>Fields marked with “*” are required fields.</p>
          </div>
        </section>
        <section className='mt-6 flex flex-col flex-1'>
          <IssuingStepContent step={step} setStep={setStep}/>
        </section>
      </div>
      
      <Footer activePage='ticket consumption'/>
    </div>
  )
}

export default IssuingTicket