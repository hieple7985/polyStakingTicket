import React, { useState, memo } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { ImCross } from 'react-icons/im'
import ticketTypes from '../../../data/ticket_types';

interface SelectTypeT {
  id: number,
  name: string
}
interface Props {
  selectedType: SelectTypeT;
  setActiveTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedType: React.Dispatch<React.SetStateAction<SelectTypeT>>;
}

const TicketTypeModal: React.FC<Props> = ({selectedType, setActiveTypeModal, setSelectedType}: Props): React.ReactElement => {
  const checkType: SelectTypeT = selectedType.id ? selectedType : {id: ticketTypes[0].id, name: ticketTypes[0].type};
  const [currentType, setCurrentType] = useState<SelectTypeT>(checkType)

  const confirmModal = (): void => {
    setSelectedType(currentType)
    setActiveTypeModal(false);
  }
  
  const cancelModal = (): void => {
    setActiveTypeModal(false);
  }

  return (
    <section className='modal-wrap'>
      <div className='modal-bg' onClick={cancelModal}></div>
      <div className='fixed-comp modal'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-10/12 mt-12'>
          {ticketTypes.map(ticketType => (
            <div key={ticketType.id} className=' items-center border-b border-solid'>
              <button 
                className='w-full py-6 flex justify-between items-center'
                onClick={() => setCurrentType({id: ticketType.id, name: ticketType.type})}
              >
                <p 
                  className={`font-semibold 
                    ${ticketType.id === currentType.id && 'text-primaryColor'}`}
                >
                  {ticketType.type}
                </p>
                <i 
                  className={`text-primaryColor 
                    ${ticketType.id === currentType.id || 'hidden'}`}
                >
                  <ImCheckmark />
                </i>
              </button>
              
            </div>
          ))}
          <div className='footer-full-w-btn my-6'>
            <button className='primary-btn' onClick={confirmModal}>
              OK
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(TicketTypeModal)