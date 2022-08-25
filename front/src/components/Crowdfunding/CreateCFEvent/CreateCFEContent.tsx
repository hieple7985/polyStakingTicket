import React, { memo, useRef, useState } from 'react'
import CompleteModal from '../../IssuingTicket/IssuingTicketModal/CompleteModal';

import CCFEStep1 from './CreateCFESteps/CCFEStep1';
import CCFEStep2 from './CreateCFESteps/CCFEStep2';
import CCFEStep3 from './CreateCFESteps/CCFEStep3';
import CCFEStep4 from './CreateCFESteps/CCFEStep4';
import { CreateTicketCFT } from '../../../api/mutations/createEventCF';


interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const CreateCFEContent: React.FC<Props> = ({ step, setStep }: Props): React.ReactElement => {
  const formData = useRef<CreateTicketCFT>({
    catogory_id: [],
    approver: [],
    end_date: '',
    end_date_cf: '',
    estimate_price: 0,
    event_info: '',
    event_name: '',
    event_name_cf: '',
    image_event: '',
    image_eventcf: '',
    image_ticket: '',
    location: '',
    owner: '',
    price_ticket: 0,
    start_date: '',
    start_date_cf: '',
    supply: 0,
    ticket_class: '',
    total_raise: 0
  })
  const [isComplete, setComplete] = useState<boolean>(false);
  return (
    <>
      <article className='flex-1 flex w-full'>
        {
          isComplete &&
          <CompleteModal setComplete={setComplete} />
        }
        {/* Step 1 */}
        <div className={step === 1 ? 'flex flex-col flex-1' : 'hidden'}>
          <CCFEStep1 setStep={setStep} formData={formData} />
        </div>

        {/* Step 2 */}
        <div className={step === 2 ? 'flex flex-col flex-1' : 'hidden'}>
          <CCFEStep2 setStep={setStep} formData={formData} />
        </div>

        {/* Step 3 */}
        <div className={step === 3 ? 'flex flex-col flex-1' : 'hidden'}>
          <CCFEStep3 setStep={setStep} formData={formData} />
        </div>

        {/* Step 4 */}
        <div className={step === 4 ? 'flex flex-col flex-1' : 'hidden'}>
          <CCFEStep4 setComplete={setComplete} formData={formData} />
        </div>
      </article>
    </>
  )
}

export default memo(CreateCFEContent)