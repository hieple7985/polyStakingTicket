import React, {memo} from 'react'

import './OverviewItem.css'

interface Props {
  usable: number;
}

const TicketUsedSign: React.FC<Props> = ({usable}: Props): React.ReactElement => {
  return (
    <>
      {usable === 2 && 
        <div className='overview_used_sign'>
          Used
        </div>
      }
    </>
  )
}

export default memo(TicketUsedSign)