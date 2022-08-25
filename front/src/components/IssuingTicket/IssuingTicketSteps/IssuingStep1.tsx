import React, { MutableRefObject, useState, memo } from 'react'
import { CreateTicket } from '../../../api/mutations/createTicket';
import SelectEventModal from '../IssuingTicketModal/SelectEventModal';
import { useLocation } from 'react-router-dom';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  submitData: MutableRefObject<CreateTicket>
}

interface LocationState {
  event: string,
  id: number,
  isExistData: true
}

interface SelectedEvent {
  id: number,
  name: string
}

const IssuingStep1: React.FC<Props> = ({ setStep, submitData }: Props): React.ReactElement => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const defaultData = locationState && locationState.isExistData ? { id: locationState.id, name: locationState.event } : { id: 0, name: '' }

  const [isFirstTime, setFirstTime] = useState<boolean>(true);
  const [activeEventModal, setActiveEventModal] = useState<boolean>(false);

  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>(defaultData);

  const checkEmptyInput = (): void => {
    isFirstTime && setFirstTime(false);
    if (selectedEvent.id) {
      submitData.current = { ...submitData.current, event: selectedEvent.id }
      setStep(step => step + 1);
    }
  }

  return (
    <>
      {
        activeEventModal &&
        <SelectEventModal showModal={setActiveEventModal} setData={setSelectedEvent} currentSelected={selectedEvent} />
      }
      <article className='flex-1'>
        <div className='issuing-label'>
          <label htmlFor="issuing-ticket-event-input">Event *</label>
        </div>
        <div className={`issuing-input mt-2 ${!isFirstTime && !selectedEvent.name && 'alert'} ${selectedEvent.name && 'active'}`}>
          <input
            type="text"
            id="issuing-ticket-event-input"
            className='cursor-pointer '
            placeholder='Select event'
            value={selectedEvent.name}
            onClick={() => setActiveEventModal(true)}
            readOnly
          />
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedEvent.name ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>* Please fill in the information</p>
        </div>
      </article>
      <article className='footer-full-w-btn w-full mt-10 mb-32'>
        <button className='primary-btn' onClick={(checkEmptyInput)}>
          Continue
        </button>
      </article>
    </>
  )
}

export default memo(IssuingStep1)
