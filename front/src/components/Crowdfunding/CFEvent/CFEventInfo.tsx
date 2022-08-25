import React, { memo } from 'react'

import './CFEvent.css'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { CFEventInterface } from '../../../api/queries/getCFEvent';
import { formatDateAndTimeShort } from '../../../util/FormatDateAndTimeShort';
import { ConvertToPercent } from '../../../util/ConvertToPercent';

interface Props {
  cfEvent: CFEventInterface;
}

const CFEventInfo: React.FC<Props> = ({cfEvent}: Props): React.ReactElement => {
  return (
    <div className='w-full flex flex-col mb-6'>
      <div className='cf-event-info-item'>
        <h6>Total Raise</h6>
        <div>
          <p className='text-xl leading-4'>{cfEvent.totalRaise}</p>
          <span className='ml-1'>Tickets</span>
        </div>
      </div>
      <div className='cf-event-info-item'>
        <h6>Price</h6>
        <div>
          <p>1 Ticket = {cfEvent.fundingPrice} MATIC</p>
        </div>
      </div>
      <div className='cf-event-info-item'>
        <h6>Start</h6>
        <div>
          <p>{formatDateAndTimeShort(new Date(cfEvent.startDate))}</p>
        </div>
      </div>
      <div className='cf-event-info-item'>
        <h6>End</h6>
        <div>
          <p>{formatDateAndTimeShort(new Date(cfEvent.endDate))}</p>
        </div>
      </div>
      <div className='mt-3'>
        <Box className="w-full">
          <p className='text-right text-xs text-primaryColor font-semibold'>{ConvertToPercent(cfEvent.currentRaise, cfEvent.totalRaise)}%</p>
          <LinearProgress variant="determinate" value={ConvertToPercent(cfEvent.currentRaise, cfEvent.totalRaise)} className="rounded-3xl overflow-hidden"/>
        </Box>
      </div>
    </div>
  )
}

export default memo(CFEventInfo)