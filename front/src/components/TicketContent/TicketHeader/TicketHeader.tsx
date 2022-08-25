import React, { memo } from 'react'

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface Props {
  image: string;
  rootURL: string,
}

const TicketHeader: React.FC<Props> = ({image, rootURL}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    if (url === "-1") {
      navigate(-1);
    }
    else navigate(url);
  }

  return (
    <>
      <div className='h-72 w-full relative'>
        <img src={image} alt="Ticket" className='object-cover h-full w-full object-center'/>
        <i 
          className='ticket-getback absolute top-9 left-4 text-primaryColor text-2xl 
            p-2 bg-white rounded-full cursor-pointer hover:text-white hover:bg-primaryColor'
          onClick={() => handleNavigate(rootURL)}
        >
          <IoMdArrowRoundBack />
        </i>
      </div>
    </>
  )
}

export default memo(TicketHeader)