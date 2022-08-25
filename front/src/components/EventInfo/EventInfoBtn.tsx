import React from 'react'

interface Props {
  setShowEventInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventInfoBtn: React.FC<Props> = ({setShowEventInfo}: Props): React.ReactElement => {
  return (
    <button 
      type='button' 
      className='absolute right-0 bottom-0 py-2 px-4 mr-2 mb-2
      border border-solid rounded-2xl text-xl font-semibold
        bg-white text-primaryColor border-primaryColor
        hover:bg-primaryColor hover:text-white'
      onClick={() => setShowEventInfo(true)}
    >
      Event Info
    </button>
  )
}

export default EventInfoBtn