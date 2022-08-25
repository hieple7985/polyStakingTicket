import React, { useState, memo } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { ImCross } from 'react-icons/im'
import ticketClasses, {TicketClassInterface} from '../../../data/ticket_classes';


interface Props {
  selectedClass: TicketClassInterface;
  setActiveClassModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedClass: React.Dispatch<React.SetStateAction<TicketClassInterface>>;
}

const TicketClassModal: React.FC<Props> = ({selectedClass, setActiveClassModal, setSelectedClass}: Props): React.ReactElement => {
  const checkClass: TicketClassInterface = selectedClass.id ? selectedClass : {id: ticketClasses[0].id, class: ticketClasses[0].class};
  const [currentClass, setCurrentClass] = useState<TicketClassInterface>(checkClass)

  const confirmModal = (): void => {
    setSelectedClass(currentClass)
    setActiveClassModal(false);
  }
  
  const cancelModal = (): void => {
    setActiveClassModal(false);
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
          {ticketClasses.map(ticketClass => (
            <div key={ticketClass.id} className=' items-center border-b border-solid'>
              <button 
                className='w-full py-6 flex justify-between items-center'
                onClick={() => setCurrentClass({id: ticketClass.id, class: ticketClass.class})}
              >
                <p 
                  className={`font-semibold 
                    ${ticketClass.id === currentClass.id && 'text-primaryColor'}`}
                >
                  {ticketClass.class}
                </p>
                <i 
                  className={`text-primaryColor 
                    ${ticketClass.id === currentClass.id || 'hidden'}`}
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

export default memo(TicketClassModal)