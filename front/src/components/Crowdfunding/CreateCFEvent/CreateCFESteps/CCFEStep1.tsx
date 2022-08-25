import React, { MutableRefObject, useState, memo } from 'react'
import { BsFillCalendarEventFill, BsFillClockFill } from 'react-icons/bs';
import { FaCamera } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { ConvertCategoriesType } from '../../../../util/ConvertCategories';
import { toTitleCase } from '../../../../util/FormatStringToTitle';
import EventCategoriesModal from '../../../Event/CreateEvent/EventCategoriesModal';
import EventDateModal from '../../../Event/CreateEvent/EventDateModal';
import EventTimeModal from '../../../Event/CreateEvent/EventTimeModal';

import TextField from '@mui/material/TextField';
import '../CreateCFEvent.css'
import { CreateTicketCFT } from '../../../../api/mutations/createEventCF';
import moment from 'moment';
import UploadImage from '../../../../util/UploadImage';
import LoadingField from '../../../LoadingField/LoadingField';
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: MutableRefObject<CreateTicketCFT>
}

const CCFEStep1: React.FC<Props> = ({ setStep, formData }: Props): React.ReactElement => {
  const [loading, setLoading] = useState(false)
  const [isFirstTime, setFirstTime] = useState<boolean>(true);

  const [activeDateModal, setActiveDateModal] = useState<boolean>(false);
  const [activeTimeModal, setActiveTimeModal] = useState<boolean>(false);
  const [isStartDateTime, setStartDateTime] = useState<boolean>(false);

  const [selectedCFStartDate, setSelectedCFStartDate] = useState<Date | null>(null);
  const [selectedCFStartTime, setSelectedCFStartTime] = useState<Date | null>(null);
  const [selectedCFEndDate, setSelectedCFEndDate] = useState<Date | null>(null);
  const [selectedCFEndTime, setSelectedCFEndTime] = useState<Date | null>(null);

  const [selectedCFPrice, setSelectedCFPrice] = useState<string>('');
  const [selectedCFName, setSelectedCFName] = useState<string>('');
  const [selectedTotalRaise, setSelectedTotalRaise] = useState<string>('');
  const [selectedEventInfo, setSelectedEventInfo] = useState<string>('');
  const [selectedCFImg, setSelectedCFImg] = useState<File | null>(null);


  const handleChangeCF = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      setSelectedCFImg(e.target.files[0]);
    }
  }
  const handleSubmitDataStep1 = async () => {
    isFirstTime && setFirstTime(false);

    if (selectedCFStartDate && selectedCFStartTime && selectedCFEndDate && selectedCFEndTime && selectedEventInfo &&
      selectedTotalRaise && selectedCFImg && selectedCFName && selectedCFPrice) {
      setLoading(true)
      const image = await UploadImage(selectedCFImg)

      formData.current = {
        ...formData.current,
        start_date_cf: `${moment(selectedCFStartDate).format('YYYY/MM/DD')} ${moment(selectedCFStartTime).format('HH:mm')}`,
        end_date_cf: `${moment(selectedCFEndDate).format('YYYY/MM/DD')} ${moment(selectedCFEndTime).format('HH:mm')}`,
        event_name_cf: selectedCFName,
        image_eventcf: image,
        total_raise: Number(selectedTotalRaise),
        event_info: selectedEventInfo,
        estimate_price: Number(selectedCFPrice)
      }
      setLoading(false)

      setStep(2);

    }
  }

  return (
    <div>
      <>
        {activeDateModal &&
          (isStartDateTime
            ?
            <EventDateModal
              selectedDate={selectedCFStartDate}
              setSelectedDate={setSelectedCFStartDate}
              setActiveDateModal={setActiveDateModal}
            />
            :
            <EventDateModal
              selectedDate={selectedCFEndDate}
              setSelectedDate={setSelectedCFEndDate}
              setActiveDateModal={setActiveDateModal}
            />
          )
        }
        {activeTimeModal &&
          (isStartDateTime
            ?
            <EventTimeModal
              selectedTime={selectedCFEndDate}
              setSelectedTime={setSelectedCFStartTime}
              setActiveTimeModal={setActiveTimeModal}
            />
            :
            <EventTimeModal
              selectedTime={selectedCFEndTime}
              setSelectedTime={setSelectedCFEndTime}
              setActiveTimeModal={setActiveTimeModal}
            />
          )
        }
      </>
      <div className='w-full'>
        <div>
          You need to generate data for the event you want to raise funds for.
        </div>

        {/* CF Event Name Input */}
        <article className='mb-6'>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="cf-name-input">Crowdfunding event name *</label>
          </div>
          <div className={`${selectedCFName && 'active'} ${!isFirstTime && !selectedCFName && 'alert'} create-cfe-input mt-2`}>
            <input
              type="text"
              id="cf-name-input"
              placeholder='Event name'
              value={selectedCFName}
              onChange={(e) => setSelectedCFName(e.target.value)}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedCFName ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        <article>
          <div className='create-cfe-label'>
            <label htmlFor="event">Cover image *</label>
          </div>
          <div >
            <label
              htmlFor='cf-img-input'
              className={`create-cfe-cover-img w-full overflow-hidden ${!isFirstTime && !selectedCFImg && 'alert'} ${selectedCFImg && 'active'}`}
            >
              {selectedCFImg
                ?
                <img
                  src={URL.createObjectURL(selectedCFImg)} alt="Selected Cover"
                  className='object-cover w-full h-full object-center'
                />
                :
                <>
                  <i className='text-3xl'><FaCamera /></i>
                  <p className='mt-2'>Select cover image</p>
                </>
              }
            </label>
            <input
              type="file" id="cf-img-input"
              className='hidden' accept="image/*"
              onChange={handleChangeCF}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedCFImg ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* CF Event Total Raise */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="create-cfe-total-raise">Total raise *</label>
            <small className='block text-gray-400'>
              (Total number of tickets needed to open the event)
            </small>
          </div>
          <div className={`create-cfe-input mt-2 ${!isFirstTime && !selectedTotalRaise && 'alert'} ${selectedTotalRaise && 'active'}`}>
            <input
              type="number"
              id="create-cfe-total-raise"
              placeholder="Total ticket"
              value={selectedTotalRaise}
              onChange={(e) => setSelectedTotalRaise(e.target.value)}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedTotalRaise ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Price */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="create-cfe-price-input">Estimate price / Ticket *</label>
          </div>
          <div className={`create-cfe-input mt-2 ${!isFirstTime && !selectedCFPrice && 'alert'} ${selectedCFPrice && 'active'}`}>
            <input
              type="number"
              min="0"
              id="create-cfe-price-input"
              placeholder='Set estimate price'
              value={selectedCFPrice}
              onChange={(e) => setSelectedCFPrice(e.target.value)}
            />
            <p>MATIC</p>
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedCFPrice ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Ticket Start Date Input */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="cf-start-date-input">
              Start date and time to crowdfunding *
            </label>
          </div>
          <div className='mt-2'>
            <button
              type="button"
              id="cf-start-date-input"
              className={`create-cfe-input-btn ${selectedCFStartDate && 'active'} ${!isFirstTime && !selectedCFStartDate && 'alert'}`}
              onClick={() => { setActiveDateModal(true); setStartDateTime(true) }}
            >
              <p>{selectedCFStartDate ? selectedCFStartDate.toLocaleDateString('en-US') : 'Select start date'}</p>
              <i><BsFillCalendarEventFill /></i>
            </button>
            <button
              type="button"
              id="cf-start-date-input"
              className={`create-cfe-input-btn mt-4 ${selectedCFStartTime && 'active'} ${!isFirstTime && !selectedCFStartTime && 'alert'}`}
              onClick={() => { setActiveTimeModal(true); setStartDateTime(true) }}
            >
              <p>
                {selectedCFStartTime
                  ? selectedCFStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'Select start time'
                }
              </p>
              <i><BsFillClockFill /></i>
            </button>
          </div>
          <div className={`mt-2 ${!isFirstTime && (!selectedCFStartDate || !selectedCFStartTime) ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Ticket End Date Input */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="cf-end-date-input">
              End date and time to crowdfunding *
            </label>
          </div>
          <div className='mt-2'>
            <button
              type="button"
              id="cf-end-date-input"
              className={`create-cfe-input-btn ${selectedCFEndDate && 'active'} ${!isFirstTime && !selectedCFEndDate && 'alert'}`}
              onClick={() => { setActiveDateModal(true); setStartDateTime(false) }}
            >
              <p>{selectedCFEndDate ? selectedCFEndDate.toLocaleDateString('en-US') : 'Select end date'}</p>
              <i><BsFillCalendarEventFill /></i>
            </button>
            <button
              type="button"
              id="cf-end-time-input"
              className={`create-cfe-input-btn mt-4 ${selectedCFEndTime && 'active'} ${!isFirstTime && !selectedCFEndTime && 'alert'}`}
              onClick={() => { setActiveTimeModal(true); setStartDateTime(false) }}
            >
              <p>
                {selectedCFEndTime
                  ? selectedCFEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'Select end time'
                }
              </p>
              <i><BsFillClockFill /></i>
            </button>
          </div>
          <div className={`mt-2 ${!isFirstTime && (!selectedCFEndDate || !selectedCFEndTime) ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="cf-event-info-input">
              Event Info *
            </label>
          </div>
          <div className={`${selectedEventInfo && 'active'} ${!isFirstTime && !selectedEventInfo && 'alert'} create-cfe-input mt-2`}>
            <TextField
              id="cf-event-info-input"
              multiline
              placeholder='Text...'
              sx={{
                width: '100%',
                backgroundColor: 'transparent',
                opacity: `${selectedEventInfo ? 1 : 0.8}`,
                '& .MuiOutlinedInput-root': {
                  fontSize: '100%',
                  color: "#000",
                },
                '& .MuiInputBase-input': {
                  minHeight: 200,
                  px: 1,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '0!important',
                }
              }}
              value={selectedEventInfo}
              onChange={(e) => setSelectedEventInfo(e.target.value)}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedEventInfo ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Ticket Type Input */}
        <div className='footer-full-w-btn w-full mt-10 mb-6'>
          <button
            type='button'
            className={`primary-btn ${loading && 'disabled-btn'}`}
            onClick={handleSubmitDataStep1}
          >
            {
              loading ?
                <LoadingField />
                :
                'NEXT'

            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(CCFEStep1)