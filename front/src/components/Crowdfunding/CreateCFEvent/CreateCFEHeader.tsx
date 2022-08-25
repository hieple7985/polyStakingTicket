import React, { memo } from 'react'

import './CreateCFEvent.css'

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}


const CreateCFEHeader: React.FC<Props> = ({step, setStep}: Props): React.ReactElement => {
  const handleGetBack = (targetStep: number): void => {
    if (targetStep < step) {
      setStep(targetStep);
    }
  }
  return (
    <div className='create-cfe-step-header'>
      <div>
        <div 
          className={`create-cfe-step-header-item ${step >= 1 && 'active'}`}
          onClick={() => handleGetBack(1)}
        >
          <p>1</p>
          <small>Crowdfunding</small>
        </div>
      </div>
      <div className={`create-cfe-step-header-line ${step >= 2 && 'active'}`}></div>
      <div 
        className={`create-cfe-step-header-item ${step >= 2 && 'active'}`}
        onClick={() => handleGetBack(2)}
      >
        <p>2</p>
        <small>Event</small>
      </div>
      <div className={`create-cfe-step-header-line ${step >= 3 && 'active'}`}></div>
      <div 
        className={`create-cfe-step-header-item ${step >= 3 && 'active'}`}
        onClick={() => handleGetBack(3)}
      >
        <p>3</p>
        <small>Ticket</small>
      </div>
      <div className={`create-cfe-step-header-line ${step >= 4 && 'active'}`}></div>
      <div 
        className={`create-cfe-step-header-item ${step >= 4 && 'active'}`}
      >
        <p>4</p>
        <small>Infomation</small>
      </div>
    </div>
  )
}

export default memo(CreateCFEHeader)