import React, { MutableRefObject, useState, memo } from 'react'
import { FaCamera } from 'react-icons/fa'
import { CreateTicket } from '../../../api/mutations/createTicket';
import UploadImage from '../../../util/UploadImage';
import LoadingField from '../../LoadingField/LoadingField';
import TicketClassModal from '../IssuingTicketModal/TicketClassModal';
import TicketTypeModal from '../IssuingTicketModal/TicketTypeModal';
import { TicketClassInterface } from '../../../data/ticket_classes';

interface SelectTypeT {
  id: number,
  name: string
}

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  submitData: MutableRefObject<CreateTicket>
}

const IssuingStep2: React.FC<Props> = ({ setStep, submitData }: Props): React.ReactElement => {
  const [isFirstTime, setFirstTime] = useState<boolean>(true);
  const [activeTypeModal, setActiveTypeModal] = useState<boolean>(false);
  const [activeClassModal, setActiveClassModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<SelectTypeT>({ id: 0, name: '' });
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [selectedImgURL, setSelectedImgURL] = useState<File | null>(null);
  const [selectedClass, setSelectedClass] = useState<TicketClassInterface>({id: 0, class: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setSelectedImgURL(e.target.files[0]);
    }
  }

  const checkEmptyInput = async () => {
    isFirstTime && setFirstTime(false);
    if (selectedType.id && selectedPrice && selectedAmount && selectedImgURL && selectedClass) {
      setLoading(true)
      const img = await UploadImage(selectedImgURL)
      setLoading(false)
      submitData.current = {
        ...submitData.current,
        ticket_type: selectedType.id,
        price: selectedPrice,
        supply: Number(selectedAmount),
        image_link: img,
        class_ticket: selectedClass.class,
      }
      setStep(step => step + 1);
    }
  }

  return (
    <>
      {/* Modal */}
      <>
        {activeTypeModal && (
          <TicketTypeModal
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setActiveTypeModal={setActiveTypeModal}
          />
        )}
        {activeClassModal && (
          <TicketClassModal
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            setActiveClassModal={setActiveClassModal}
          />
        )}
      </>
      {/* Ticket Image Input */}
      <article className='flex-1'>
        <div className='issuing-label'>
          <label htmlFor="issuing-ticket-img-input">Cover image *</label>
        </div>
        <div >
          <label
            htmlFor='issuing-ticket-img-input'
            className={`issuing-cover-img w-full overflow-hidden ${!isFirstTime && !selectedImgURL && 'alert'} ${selectedImgURL && 'active'}`}
          >
            {selectedImgURL
              ?
              <img
                src={URL.createObjectURL(selectedImgURL)} alt="Selected Cover"
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
            type="file" id="issuing-ticket-img-input"
            className='hidden' accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedImgURL ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>* Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Type Input */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-type-input">
            Ticket type *
          </label>
        </div>
        <div className='mt-2'>
          <button
            type="button"
            id="issuing-ticket-type-input"
            className={`issuing-input-btn ${!isFirstTime && !selectedType.id && 'alert'} ${selectedType.id && 'active'}`}
            onClick={() => setActiveTypeModal(true)}
          >
            <p>{selectedType.id ? selectedType.name : 'Select ticket type'}</p>
            {/* <i><RiTicketFill /></i> */}
          </button>
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedType.id ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>* Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Class Input */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-type-input">
            Ticket class *
          </label>
        </div>
        <div className='mt-2'>
          <button
            type="button"
            id="issuing-ticket-type-input"
            className={`issuing-input-btn ${!isFirstTime && !selectedClass.id && 'alert'} ${selectedClass.id && 'active'}`}
            onClick={() => setActiveClassModal(true)}
          >
            <p>{selectedClass.id ? selectedClass.class : 'Select ticket class'}</p>
            {/* <i><RiTicketFill /></i> */}
          </button>
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedType.id ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>* Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Price */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-price-input">Price *</label>
        </div>
        <div className={`issuing-input mt-2 ${!isFirstTime && !selectedPrice && 'alert'} ${selectedPrice && 'active'}`}>
          <input
            type="number"
            min="0"
            id="issuing-ticket-price-input"
            placeholder='Set price'
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          />
          <p>MATIC</p>
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedPrice ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>* Please fill in the information</p>
        </div>
      </article>

      {/* Ticket Supply */}
      <article>
        <div className='issuing-label mt-6'>
          <label htmlFor="issuing-ticket-amount-input">Amount *</label>
        </div>
        <div className={`issuing-input mt-2 ${!isFirstTime && !selectedAmount && 'alert'} ${selectedAmount && 'active'}`}>
          <input
            type="number"
            min="0"
            id="issuing-ticket-amount-input"
            placeholder='Set amount of ticket'
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
          />
        </div>
        <div className={`mt-2 ${!isFirstTime && !selectedAmount ? 'block' : 'hidden'}`}>
          <p className='text-red-600'>* Please fill in the information</p>
        </div>
      </article>
      <article className='footer-full-w-btn w-full mt-10 mb-32'>
        <button className={`primary-btn ${loading && 'disable-button'}`} onClick={checkEmptyInput}>
          {
            loading ? <LoadingField/> : 'Continue'
          }
        </button>
      </article>
    </>
  )
}

export default memo(IssuingStep2)