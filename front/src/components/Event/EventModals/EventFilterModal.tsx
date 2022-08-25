import React, { useState, memo } from 'react'
import { ImCross } from 'react-icons/im';
import { filters } from '../../../data/eventFilters';

interface Props {
  activeFilterModal: boolean,
  setActiveFilterModal: React.Dispatch<React.SetStateAction<boolean>>,
  filterIndex: number,
  setFilterIndex: React.Dispatch<React.SetStateAction<number>>,
}

const EventFilterModal: React.FC<Props> = ({activeFilterModal, setActiveFilterModal, filterIndex, setFilterIndex}: Props): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState<number>(filterIndex)
  const confirmModal = (): void => {
    setFilterIndex(currentIndex)
    setActiveFilterModal(false);
  }
  const cancelModal = (): void => {
    setActiveFilterModal(false);
  }
  return (
    <>
      {activeFilterModal && (
        <section className='modal-wrap'>
          <div className='modal-bg'></div>
          <div className='fixed-comp modal'>
            <div className='modal-exit-btn'>
              <button onClick={cancelModal}>
                <i><ImCross /></i>
              </button>
            </div>
            <div className='w-full mt-12 mb-6'>
              <p className='text-center text-2xl font-bold mt-3'>SELECT FILTER</p>
              <ul className='w-full text-center mt-6'>
                {filters.map((filter, index) => (
                  <li key={index} className={`mb-3 pt-3 w-10/12 mx-auto ${index > 0 && 'border-t border-solid border-gray-300'}`}>
                    <button 
                      onClick={() => setCurrentIndex(index)}
                      className={`text-lg font-semibold hover:text-xl hover:text-primaryColor ${currentIndex === index && 'font-bold text-2xl text-primaryColor'}`}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-10/12'>
              <div className='footer-full-w-btn mb-6'>
                <button className='primary-btn' onClick={confirmModal}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default memo(EventFilterModal)