import React, { useState } from 'react'

import CreateCFEContent from '../../components/Crowdfunding/CreateCFEvent/CreateCFEContent'
import SubHeader from '../../components/SubHeader/SubHeader';
import CreateCFEHeader from '../../components/Crowdfunding/CreateCFEvent/CreateCFEHeader';


const CreateCFEvent: React.FC = (): React.ReactElement => {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <div className='wrap border-x-only relative'>
        <div className='container'>
          <section>
            <SubHeader pageName='Create Crowdfunding Event' rootURL={`-1`} />
          </section>
          <section className='relative mt-8'>
            <div>
              <CreateCFEHeader step={step} setStep={setStep} />
            </div>
            <div className='mt-10 w-3/4 mx-auto text-center text-sm font-semibold'>
              <p>Fill in the fields to create a ticket. </p>
              <p>Fields marked with “*” are required fields.</p>
            </div>
          </section>
          <section className='mt-6 flex flex-col flex-1'>
            <CreateCFEContent step={step} setStep={setStep} />
          </section>
        </div>
      </div>
    </>
  )
}

export default CreateCFEvent