import React, { memo } from 'react'

import './StatisticHeader.css'

interface Props {
  statType: string,
  setStatType: React.Dispatch<React.SetStateAction<string>>;
  issuedEventAmount: number;
  boughtTicketsAmount: number;
  totalFavourite: number;
  cfEventAmount: number;
}

const StatisticHeader: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
      <article className='statistic-header flex justify-between'>
        <button 
          className={props.statType === 'issued' ? 'active' : ''}
          onClick={() => props.setStatType('issued')}
        >
          Issued
          <span>({props.issuedEventAmount})</span>
        </button>
        <button
          className={props.statType === 'bought' ? 'active' : ''}
          onClick={() => props.setStatType('bought')}
        >
          Bought
          <span>({props.boughtTicketsAmount})</span>
        </button>
        <button
          className={props.statType === 'favorited' ? 'active' : ''}
          onClick={() => props.setStatType('favorited')}
        >
          Favorited
          <span>({props.totalFavourite})</span>
        </button>
        <button
          className={props.statType === 'crowdfunding' ? 'active' : ''}
          onClick={() => props.setStatType('crowdfunding')}
        >
          Crowdfunding
          <span>({props.cfEventAmount})</span>
        </button>
      </article>
    </>
  )
}

export default memo(StatisticHeader)