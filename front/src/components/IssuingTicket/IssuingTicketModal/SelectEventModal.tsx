import React, { useState, memo } from 'react'
import type { } from '@mui/x-date-pickers/themeAugmentation';
import EVENT_ICON from '../../../assets/images/event-icon.png'
import CATEGORY_ICON from '../../../assets/images/category-icon.png'
import LOCATION_ICON from '../../../assets/images/location-icon.png'
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useQuery } from '@apollo/client';

import LoadingField from '../../../components/LoadingField/LoadingField'
import { useAccountStore } from '../../../context/AccountProvider';
import { toTitleCase } from '../../../util/FormatStringToTitle';
import { observer } from 'mobx-react-lite';
import { EventInterface, GET_AVAILABLE_EVENTS_BY_USER } from '../../../api/queries/getEvents';

interface SelectedEvent {
  id: number,
  name: string
}
interface Props {
  showModal: React.Dispatch<React.SetStateAction<boolean>>
  setData: (value: SelectedEvent) => void;
  currentSelected: SelectedEvent
}

const SelectEventModal: React.FC<Props> = observer(({ showModal, setData, currentSelected }: Props): React.ReactElement => {
  const userData = useAccountStore()

  const [selected, setSelected] = useState<SelectedEvent>(currentSelected)
  const { loading, error, data } = useQuery(GET_AVAILABLE_EVENTS_BY_USER, {
    variables: {
      userName: userData.store.account.user,
    },
    fetchPolicy: "no-cache"
  });

  const cancelModal = (): void => {
    showModal(false);
  }

  const handleSelected = (): void => {
    setData(selected);
    showModal(false);
  }

  if (error) console.log(error);
  
  return (
    <section className='modal-wrap'>
      <div className='modal-bg'></div>
      <div className='fixed-comp modal'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='mt-12 font-bold text-xl'>
          Events
        </div>
        <div className='wrap-event-list w-11/12'>
          {
            loading &&
            <div className='my-6'><LoadingField /></div>
          }
          { error &&
            <div>Error: Can&apos;t load events!</div>
          }
          {
            data &&
              (data.events.length > 0 
              ?
                data.events.map((event: EventInterface) => {
                  return ((
                    <div key={event.id} onClick={() => setSelected({ id: event.id, name: event.name })} className='mt-6 border-bottom hover:opacity-60 cursor-pointer'>
                      <div className='event-item'>
                        <div className='flex justify-between items-center font-bold text-xl mb-4'>
                          {event.name}
                          {
                            selected.id === event.id &&
                            <i className='text-primaryColor'>
                              <ImCheckmark />
                            </i>
                          }
                        </div>
                        <div className='flex items-center mb-3'>
                          <img src={EVENT_ICON} className="mr-2" alt="event_id" />
                          <div>{event.id}</div>
                        </div>
                        <div className='flex items-center mb-3'>
                          <img src={CATEGORY_ICON} className="mr-2" alt="category" />
                          <span>
                            {event.eventCategories.map((category, index) => {
                              return (
                                <span key={category.category.id}>
                                  {toTitleCase(category.category.name)}
                                  {event.eventCategories.length - 1 === index ? '' : ', '}
                                </span>
                              )
                            })}
                          </span>
                        </div>
                        <div className='flex items-center mb-3'>
                          <img src={LOCATION_ICON} className="mr-2" alt="location" />
                          <div>{event.location}</div>
                        </div>
                      </div>
                    </div>
                  ))
                })
              :
              <div className='my-6 text-lg text-gray-500 font-semibold w-full text-center'>
                You don&apos;t have any active event!
              </div>
              )
          }
        </div>
        <div className='w-11/12'>
          <div className='footer-full-w-btn mb-6 mt-3'>
            <button className='primary-btn cursor-pointer' onClick={handleSelected}>
              OK
            </button>
          </div>
        </div>
      </div>

    </section>
  )
});

export default memo(SelectEventModal)