import React, { MutableRefObject, useState, memo } from 'react'
import { BsFillCalendarEventFill, BsFillClockFill } from 'react-icons/bs';
import { FaCamera } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { ConvertCategoriesType } from '../../../../util/ConvertCategories';
import { toTitleCase } from '../../../../util/FormatStringToTitle';
import EventCategoriesModal from '../../../Event/CreateEvent/EventCategoriesModal';
import EventDateModal from '../../../Event/CreateEvent/EventDateModal';
import EventTimeModal from '../../../Event/CreateEvent/EventTimeModal';

import { CreateTicketCFT } from '../../../../api/mutations/createEventCF';
import moment from 'moment';
import UploadImage from '../../../../util/UploadImage';
import '../CreateCFEvent.css'
import LoadingField from '../../../LoadingField/LoadingField';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: MutableRefObject<CreateTicketCFT>
}

const CCFEStep2: React.FC<Props> = ({ setStep, formData }: Props): React.ReactElement => {
  const [loading, setLoading] = useState(false)
  const [isFirstTime, setFirstTime] = useState<boolean>(true);

  const [activeDateModal, setActiveDateModal] = useState<boolean>(false);
  const [activeTimeModal, setActiveTimeModal] = useState<boolean>(false);
  const [activeTypeModal, setActiveTypeModal] = useState<boolean>(false);
  const [isStartDateTime, setStartDateTime] = useState<boolean>(false);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<ConvertCategoriesType[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<File | null>(null);


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      setSelectedImg(e.target.files[0]);
    }
  }
  const handleSubmitData = async () => {
    isFirstTime && setFirstTime(false);

    if (selectedStartDate && selectedStartTime && selectedEndDate && selectedEndTime && selectedLocation && selectedImg && selectedName && selectedCategory.some(ele => ele.check)) {
      setLoading(true)
      const image = await UploadImage(selectedImg)
      formData.current = {
        ...formData.current,
        start_date: `${moment(selectedStartDate).format('YYYY/MM/DD')} ${moment(selectedStartTime).format('HH:mm')}`,
        end_date: `${moment(selectedEndDate).format('YYYY/MM/DD')} ${moment(selectedEndTime).format('HH:mm')}`,
        location: selectedLocation,
        image_event: image,
        event_name: selectedName,
        catogory_id: selectedCategory.filter((item: ConvertCategoriesType) => item.check)
          .map((item: ConvertCategoriesType) => item.id)
      }
      setLoading(false)

      setStep(3);
    }
  }

  const handleDeleteCategory = (id: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const newValue = selectedCategory.map(ele => ele.id === id ? { ...ele, check: false } : ele)
    setSelectedCategory(newValue)
  }

  return (
    <div>
      <>
        {activeDateModal &&
          (isStartDateTime
            ?
            <EventDateModal
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
              setActiveDateModal={setActiveDateModal}
            />
            :
            <EventDateModal
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
              setActiveDateModal={setActiveDateModal}
            />
          )
        }
        {activeTimeModal &&
          (isStartDateTime
            ?
            <EventTimeModal
              selectedTime={selectedEndDate}
              setSelectedTime={setSelectedStartTime}
              setActiveTimeModal={setActiveTimeModal}
            />
            :
            <EventTimeModal
              selectedTime={selectedEndTime}
              setSelectedTime={setSelectedEndTime}
              setActiveTimeModal={setActiveTimeModal}
            />
          )
        }
        {activeTypeModal && (
          <EventCategoriesModal
            selectedCategory={selectedCategory}
            setActiveTypeModal={setActiveTypeModal}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </>
      <div className='create-event'>
        <div>
          <div>
            You need to generate data for the event for which you want to generate tickets.
          </div>
        </div>

        {/* Event Name Input */}
        <article className='mb-6'>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="event-price-input">Event name *</label>
          </div>
          <div className={`${selectedName && 'active'} ${!isFirstTime && !selectedName && 'alert'} create-cfe-input mt-2`}>
            <input
              type="text"
              id="event-price-input"
              placeholder='Event name'
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedName ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        <article>
          <div className='create-cfe-label'>
            <label htmlFor="event">Cover image *</label>
          </div>
          <div >
            <label
              htmlFor='event-img-input'
              className={`create-cfe-cover-img w-full overflow-hidden ${!isFirstTime && !selectedImg && 'alert'} ${selectedImg && 'active'}`}
            >
              {selectedImg
                ?
                <img
                  src={URL.createObjectURL(selectedImg)} alt="Selected Cover"
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
              type="file" id="event-img-input"
              className='hidden' accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedImg ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>
        {/* categories */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="event-type-input">
              Categories *
            </label>
          </div>
          <div className='mt-2'>
            <button
              type="button"
              id="event-type-input"
              className={`create-cfe-input-btn ${!isFirstTime && !selectedCategory.some(ele => ele.check) && 'alert'} ${selectedCategory.some(ele => ele.check) && 'active'}`}
              onClick={() => setActiveTypeModal(true)}
            >
              <p className='flex'>
                {selectedCategory.some(ele => ele.check) ?
                  selectedCategory.map(ele => {
                    return (
                      ele.check ?
                        <span className='category-item' key={ele.id}>
                          {
                            toTitleCase(ele.name)
                          }
                          <i className='times-X' onClick={(e) => handleDeleteCategory(ele.id, e)}>
                            <IoMdCloseCircle />
                          </i>
                        </span>
                        : '')
                  })
                  : 'Select categories'}</p>
            </button>
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedCategory.some(ele => ele.check) ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Event Location Input */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="event-price-input">Location *</label>
          </div>
          <div className={`create-cfe-input mt-2 ${!isFirstTime && !selectedLocation && 'alert'} ${selectedLocation && 'active'}`}>
            <input
              type="text"
              id="event-price-input"
              placeholder="Add event's location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <div className={`mt-2 ${!isFirstTime && !selectedLocation ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Ticket Start Date Input */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="event-start-date-input">
              Start date and time *
            </label>
          </div>
          <div className='mt-2'>
            <button
              type="button"
              id="event-start-date-input"
              className={`create-cfe-input-btn ${selectedStartDate && 'active'} ${!isFirstTime && !selectedStartDate && 'alert'}`}
              onClick={() => { setActiveDateModal(true); setStartDateTime(true) }}
            >
              <p>{selectedStartDate ? selectedStartDate.toLocaleDateString('en-US') : 'Select start date'}</p>
              <i><BsFillCalendarEventFill /></i>
            </button>
            <button
              type="button"
              id="event-start-date-input"
              className={`create-cfe-input-btn mt-4 ${selectedStartTime && 'active'} ${!isFirstTime && !selectedStartTime && 'alert'}`}
              onClick={() => { setActiveTimeModal(true); setStartDateTime(true) }}
            >
              <p>
                {selectedStartTime
                  ? selectedStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'Select start time'
                }
              </p>
              <i><BsFillClockFill /></i>
            </button>
          </div>
          <div className={`mt-2 ${!isFirstTime && (!selectedStartDate || !selectedStartTime) ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Ticket End Date Input */}
        <article>
          <div className='create-cfe-label mt-6'>
            <label htmlFor="event-end-date-input">
              End date and time *
            </label>
          </div>
          <div className='mt-2'>
            <button
              type="button"
              id="event-end-date-input"
              className={`create-cfe-input-btn ${selectedEndDate && 'active'} ${!isFirstTime && !selectedEndDate && 'alert'}`}
              onClick={() => { setActiveDateModal(true); setStartDateTime(false) }}
            >
              <p>{selectedEndDate ? selectedEndDate.toLocaleDateString('en-US') : 'Select end date'}</p>
              <i><BsFillCalendarEventFill /></i>
            </button>
            <button
              type="button"
              id="event-end-time-input"
              className={`create-cfe-input-btn mt-4 ${selectedEndTime && 'active'} ${!isFirstTime && !selectedEndTime && 'alert'}`}
              onClick={() => { setActiveTimeModal(true); setStartDateTime(false) }}
            >
              <p>
                {selectedEndTime
                  ? selectedEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'Select end time'
                }
              </p>
              <i><BsFillClockFill /></i>
            </button>
          </div>
          <div className={`mt-2 ${!isFirstTime && (!selectedEndDate || !selectedEndTime) ? 'block' : 'hidden'}`}>
            <p className='text-red-600'>* Please fill in the information</p>
          </div>
        </article>

        {/* Ticket Type Input */}
        <div className='footer-full-w-btn w-full mt-10 mb-6'>
          <button
            type='button'
            className={`primary-btn ${loading && 'disabled-btn'}`}

            onClick={handleSubmitData}
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

export default memo(CCFEStep2)