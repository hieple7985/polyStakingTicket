import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

interface Props {
  pageName: string,
  rootURL: string,
}

const SubHeader:React.FC<Props> = (props: Props): React.ReactElement => {
  const navigate = useNavigate();
  const handleNavigate = (): void => {
    if (props.rootURL === "-1") {
      navigate(-1);
    }
    else navigate(props.rootURL);
  }

  return (
    <section className='flex items-center mt-8'>
      <button 
        onClick={handleNavigate} 
        className="opacity-80 hover:opacity-100 p-2 
        text-primaryColor rounded-full
        hover:bg-primaryColor  hover:text-white">
        <i className='text-2xl '><IoMdArrowRoundBack /></i>
      </button>
      <p className='text-xl font-semibold ml-3'>{props.pageName}</p>
    </section>
  )
}

export default memo(SubHeader)