import React, {memo} from 'react'

import './IssuingTicket.css'

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}



const IssuingStepHeader: React.FC<Props> = ({step, setStep}: Props): React.ReactElement => {
  const handleGetBack = (targetStep: number): void => {
    if (targetStep < step ) {
      setStep(targetStep);
    }
  }
  return (
    <div className='issuing-step-header'>
      <div>
        <div 
          className={`issuing-step-header-item ${step >= 1 && 'active'}`}
          onClick={() => handleGetBack(1)}
        >
          <p>1</p>
          <small>Event</small>
        </div>
      </div>
      <div className={`issuing-step-header-line ${step >= 2 && 'active'}`}></div>
      <div 
        className={`issuing-step-header-item ${step >= 2 && 'active'}`}
        onClick={() => handleGetBack(2)}
      >
        <p>2</p>
        <small>Ticket</small>
      </div>
      <div className={`issuing-step-header-line ${step >= 3 && 'active'}`}></div>
      <div 
        className={`issuing-step-header-item ${step >= 3 && 'active'}`}
      >
        <p>3</p>
        <small>Infomation</small>
      </div>
    </div>
  )
}

export default memo(IssuingStepHeader)