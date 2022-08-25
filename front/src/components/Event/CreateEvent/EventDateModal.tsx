import React, { memo } from 'react'
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import type {} from '@mui/x-date-pickers/themeAugmentation';

import { ImCross } from 'react-icons/im'

interface Props {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>
  setActiveDateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventDateModal: React.FC<Props> = ({selectedDate, setSelectedDate, setActiveDateModal}: Props): React.ReactElement => {
  const checkDate: Date = selectedDate ? selectedDate : new Date();
  const [dateValue, setDateValue] = React.useState<Date | null>(checkDate);
  const confirmModal = (): void => {
    setSelectedDate(dateValue)
    setActiveDateModal(false);
  }
  const cancelModal = (): void => {
    setActiveDateModal(false);
  }
  return (
    <section className='modal-wrap'>
      <div className='modal-bg'></div>
      <div className='fixed-comp modal modal-wrap--center'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-full mt-6'>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            showToolbar={true}
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className='w-10/12'>
          <div className='footer-full-w-btn mb-6 relative z-40' style={{marginTop: -40}}>
            <button className='primary-btn' onClick={confirmModal}>
              OK
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(EventDateModal)