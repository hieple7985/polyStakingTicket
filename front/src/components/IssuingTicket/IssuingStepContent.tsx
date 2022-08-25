import moment from 'moment';
import React, { useRef, useState, memo } from 'react'

import './IssuingTicket.css';
import CompleteModal from './IssuingTicketModal/CompleteModal';
import IssuingStep1 from './IssuingTicketSteps/IssuingStep1';
import IssuingStep2 from './IssuingTicketSteps/IssuingStep2';
import IssuingStep3 from './IssuingTicketSteps/IssuingStep3';
import { CreateTicket } from '../../api/mutations/createTicket';

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const IssuingStepContent: React.FC<Props> = observer(({ step, setStep }: Props): React.ReactElement => {
  const userData = useAccountStore()

  const submitData = useRef<CreateTicket>({
    create_at: moment().format('YYYY/MM/DD'),
    event: 0,
    owner_address: userData.store.account.user,
    supply: 0,
    ticket_type: 0,
    type: 1,
    class_ticket: '',
    user_id: Number(userData.store.account.id),
    approver: [],
    price: '',
    image_link: ''
  })
  const [isComplete, setComplete] = useState<boolean>(false);

  return (
    <>
      {isComplete &&
        <CompleteModal setComplete={setComplete} />
      }
      <article className='flex-1 flex w-full'>
        {/* Step 1 */}
        <div className={step === 1 ? 'flex flex-col flex-1' : 'hidden'}>
          <IssuingStep1 setStep={setStep} submitData={submitData} />

        </div>

        {/* Step 2 */}
        <div className={step === 2 ? 'flex flex-col flex-1' : 'hidden'}>
          <IssuingStep2 setStep={setStep} submitData={submitData}/>
        </div>

        {/* Step 3 */}
        <div className={step === 3 ? 'flex flex-col flex-1' : 'hidden'}>
          <IssuingStep3 setComplete={setComplete} submitData={submitData}/>
        </div>
      </article>
    </>
  )
});

export default memo(IssuingStepContent)