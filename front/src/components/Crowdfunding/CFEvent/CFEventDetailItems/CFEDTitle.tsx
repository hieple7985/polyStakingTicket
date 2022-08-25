import React, { memo, useEffect, useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { CFEventInterface } from '../../../../api/queries/getCFEvent';

interface Props {
  cfEvent: CFEventInterface;
}

const CFEventDetailTitle: React.FC<Props> = ({cfEvent}: Props): React.ReactElement => {
  const [copy, setCopy] = useState<boolean>(false)

  const handleCopy = ():void => {
    if (!copy) {
      navigator.clipboard.writeText(cfEvent.owner);
      setCopy(true);
    }
  }

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);
  return (
    <>
      <h3 className='font-semibold text-3xl mt-4'>
        {cfEvent.name}
      </h3>
      <div className='flex items-cennter mt-2 text-primaryColor'>
        <p className=' font-semibold'>{cfEvent.owner}</p>
        <button 
          className='ml-3 text-xl hover:opacity-80'
          onClick={handleCopy}
        >
          <i><BiCopy /></i>
        </button>
      </div>
      {copy && 
        <div>
          <p className='copy-notif font-semibold text-primaryColor text-lg'>Copied to Clipboard!</p>
        </div>
      }
    </>
  )
}

export default memo(CFEventDetailTitle)