import React, { memo } from 'react'
import { formatDateShort } from '../../../../util/FormatDateShort'

import './OverviewItem.css';

interface Props {
  start: Date,
  end: Date,
}

const TicketDate: React.FC<Props> = (props:Props): React.ReactElement => {
  return (
    <>
      <div className='attach-date'>
        <small>Start</small>
        <p>{formatDateShort(props.start)}</p>
      </div>
      <div className='attach-date'>
        <small>End</small>
        <p>{formatDateShort(props.end)}</p>
      </div>
    </>
  )
}

export default memo(TicketDate)