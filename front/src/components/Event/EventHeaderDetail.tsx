import React, {memo} from 'react'

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface Props {
  image?: string;
  rootURL: string,
  name: string
}

const EventHeaderDetail: React.FC<Props> = ({ image, rootURL, name }: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (): void => {
    if (rootURL === '-1') {
      navigate(-1);
    }
    else {
      navigate(rootURL);
    }
  }
  return (
    <>
      <div className='event-header-detail w-full relative mb-6'>
        <div className='flex items-center py-6'>

          <i
            className='text-primaryColor text-2xl
            p-2 bg-white rounded-full cursor-pointer opacity-80 hover:opacity-100
            hover:bg-primaryColor hover:text-white'
            onClick={handleNavigate}
          >
            <IoMdArrowRoundBack />
          </i>
          <h3 className='ml-3 font-semibold text-lg'>
            {name}
          </h3>
        </div>
        {image && (
          <img src={image} alt="Ticket" className='event-header-detail__img object-cover h-64 w-full object-center' />
        )}

      </div>
    </>
  )
}

export default memo(EventHeaderDetail)