import React, { useState, memo } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useQuery } from '@apollo/client';
import LoadingField from '../../LoadingField/LoadingField';
import { ExtendedDataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import TicketPriceUSD from '../../TicketContent/Overview/OverviewItem/TicketPriceUSD';
import {EventStatisticInterface, GET_EVENT_STATISTIC } from '../../../api/queries/getEventStatistic';
import { gColors } from '../../../data/globalColors';

interface Props {
  eventID: number,
}

const EventStatistics: React.FC<Props> = ({eventID}: Props): React.ReactElement => {
  const [statisData, setStatisData] = useState<EventStatisticInterface[]>([]);
  const handleShowPercentage = (dataEntry: ExtendedDataEntry) => {
    if (Math.round(dataEntry.percentage) !== 0) {
      return Math.round(dataEntry.percentage) + '%'}
    return ''
  }
  const {loading, error} = useQuery(GET_EVENT_STATISTIC, {
    variables: {
      id: eventID,
    },
    onCompleted: (data) => {
      setStatisData(data.event)
    },
    fetchPolicy: 'no-cache',
  })

  if (loading) return <div className='w-full mt-12'><LoadingField /></div>
  if (error) return <p>Error: Cannot load event statistics!</p>
  
  return (
    <>
    {statisData.length > 0 && (
      <>
        <div>
          <h3 className='font-bold text-lg'>TOTAL TICKETS:</h3>
        </div>
        {statisData[0].issued
        ?
          <>
            <div className='w-2/3 mx-auto flex justify-center mt-6'>
              <PieChart
                data={[        
                  { title: "Sold", value: (statisData[0].sold ? statisData[0].sold : 0), color: gColors.statisticSold },
                  { title: 'Remaining', value: (statisData[0].sold ? (statisData[0].issued - statisData[0].sold) : statisData[0].issued), color: gColors.statisticRemaining },
                ]}
                label={({ dataEntry }) => handleShowPercentage(dataEntry)}
                labelStyle={() => ({
                  fontSize: '8px',
                })}
                radius={42}
                labelPosition={116}
                lineWidth={50}
                animate
              />
            </div>
            <div className='w-10/12 mx-auto mt-6'>
              <div className='flex justify-between'>
                <div className='flex'>
                  <span className='block h-6 w-6 rounded-full' style={{backgroundColor: gColors.statisticSold}}></span>
                  <p className='ml-2'>Sold Tickets: </p>
                </div>
                <div>
                  <span className='mr-2'>{statisData[0].sold ? statisData[0].sold : 0}</span>
                  Ticket(s)
                </div>
              </div>
              <div className='flex justify-between mt-3'>
                <div className='flex'>
                  <span className='block h-6 w-6 rounded-full' style={{backgroundColor: gColors.statisticRemaining}}></span>
                  <p className='ml-2'>Remaining Tickets: </p>
                </div>
                <div>
                  <span className='mr-2'>{statisData[0].sold ? statisData[0].issued - statisData[0].sold : statisData[0].issued}</span>
                  Ticket(s)
                </div>
              </div>
            </div>
          </>
        :
          <p className='w-full text-center text-gray-400 text-xl font-semibold mt-6'>
            This event doesn&apos;t have any ticket!
          </p>
        }
        <div className='mt-16 w-full text-lg flex justify-between items-start leading-4'>
          <h3 className='font-bold'>TOTAL PROCEEDS:</h3>
          <div className='text-right'>
            <p className='font-bold text-primaryColor text-xl leading-3'>
              {statisData[0].total ? (Number.isInteger(statisData[0].total) ? statisData[0].total : statisData[0].total.toFixed(4)) : 0}
              <span className='ml-2'>MATIC</span>
            </p>
            <TicketPriceUSD price={statisData[0].total ? statisData[0].total : 0} />
          </div>
        </div>
      </>
    )}
    </>
  )
}

export default memo(EventStatistics)