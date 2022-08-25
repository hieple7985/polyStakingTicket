import React, { memo } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { gColors } from '../../../../data/globalColors';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CFEventInterface } from '../../../../api/queries/getCFEvent';
import { ConvertToPercent } from '../../../../util/ConvertToPercent';
import { cfStatus2 } from '../../../../data/crowdfundingStatus';

interface Props {
  cfEvent: CFEventInterface;
}

const CFEventDetailProcess: React.FC<Props> = ({cfEvent}: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div 
      className='flex flex-col items-center rounded-3xl border border-solid 
      border-gray-100 pb-6'
      style={{ boxShadow: `0 0 2px 4px ${gColors.whiteSmoke}`,}}
    >
      <p className='mt-6 text-gray-400'>{cfStatus2[cfEvent.status]}</p>
      <h6 className='mt-6 text-2xl font-semibold text-primaryColor'>
        {cfEvent.currentRaise}/{cfEvent.totalRaise} Tickets
      </h6>
      <Box className="w-10/12 mt-6">
        <p className='text-right text-xs text-primaryColor font-semibold'>
          {ConvertToPercent(cfEvent.currentRaise, cfEvent.totalRaise)}
        </p>
        <LinearProgress 
          variant="determinate" 
          value={ConvertToPercent(cfEvent.currentRaise, cfEvent.totalRaise)} 
          className="rounded-3xl overflow-hidden"
        />
      </Box>
      <button 
        className={`mt-6 py-1 px-6 rounded-3xl border border-solid primary-btn ${cfEvent.status !== 2 && 'disable-button'}`} 
        onClick={() => navigate('join', {
          state: {
            cfEvent: cfEvent,
          }
        })}
      >
        + Join
      </button>
    </div>
  )
}

export default memo(CFEventDetailProcess)