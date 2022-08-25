import React, { memo, useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import './CFEDItem.css'
import { CFEventInterface } from '../../../../api/queries/getCFEvent';
import { FormatDateAndTimeFull } from '../../../../util/FormatDateAndTimeFull';
import { observer } from 'mobx-react-lite';
import { useAccountStore } from '../../../../context/AccountProvider';
import { Participant } from '../../../../api/queries/getParticipants';
import { formatDateShort } from '../../../../util/FormatDateShort';

interface Props {
  cfEvent: CFEventInterface;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: 600,
  padding: 0,
  minWidth: 'auto',
  marginRight: 24,
})

function TabPanel({ children, value, index}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div className='mt-6' style={{minHeight: 200}}>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const CFEDInfo: React.FC<Props> = observer(({cfEvent}: Props): React.ReactElement => {
  const userData = useAccountStore();
  const [value, setValue] = useState<number>(0);
  const [participantLog, setParticipantLog] = useState<Participant[]>([]);

  const checkParticipants = (): boolean => {
    let returnValue = false;
    cfEvent.participants.forEach(participant => {
      if (participant.userID === Number(userData.store.account.id)) {
        setParticipantLog((participantLog) => [...participantLog, participant]);
        returnValue = true;
        return true;
      }
    })
    return returnValue;
  } 

  useEffect(() => {
    if (cfEvent) {
      checkParticipants();
    }
  }, [cfEvent])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <CustomTab label="Detail" {...a11yProps(0)} />
          <CustomTab label="Event Info" {...a11yProps(1)} />
          {(userData.store.account.user !== cfEvent.owner && participantLog.length > 0) && 
            <CustomTab label="History" {...a11yProps(2)} />
          }
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h4 className='cfed-detail-title'>Detail</h4>
        <div>
          <div className='cfed-detail-item'>
            <h6>Start Date:</h6>
            <span>
              <p>{FormatDateAndTimeFull(new Date(cfEvent.startDate)).date}</p>
              <small>{FormatDateAndTimeFull(new Date(cfEvent.startDate)).time}</small>
            </span>
          </div>
          <div className='cfed-detail-item'>
            <h6>End Date:</h6>
            <span>
              <p>{FormatDateAndTimeFull(new Date(cfEvent.endDate)).date}</p>
              <small>{FormatDateAndTimeFull(new Date(cfEvent.endDate)).time}</small>
            </span>
          </div>
          <div className='cfed-detail-item'>
            <h6>Total Raise:</h6>
            <span>
              <p>{cfEvent.totalRaise} Tickets</p>
            </span>
          </div>
          <div className='cfed-detail-item'>
            <h6>Price:</h6>
            <span>
              <p>1 Ticket = {cfEvent.fundingPrice} MATIC</p>
            </span>
          </div>
        </div>

      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <h4 className='cfed-detail-title'>Event Info</h4>
        <div className='cfed-detail-item whitespace-pre-line'>
          {cfEvent.info}
        </div>
      </TabPanel>
      
      {(userData.store.account.user !== cfEvent.owner && participantLog.length > 0) && 
        <TabPanel value={value} index={2}>
          <h6 className='cfed-detail-title'>History</h6>
          {participantLog.map((participant) => (
            <div key={participant.id} className='mt-4 pb-6 border-b-2 border-solid border-gray-200'>
              <p>You has contribute {participant.amount} Ticket at {formatDateShort(new Date(participant.joinDate))}.</p>
            </div>
          ))}
          {cfEvent.status === 3 &&
            <div className='mt-6'>
              <div className='flex justify-between items-center font-semibold text-lg'>
                <h6 className='font-semibold'>Your reward:</h6>
                <p className='text-primaryColor'>0.02 MATIC</p>
              </div>
              <div className='mt-6 flex justify-center text-lg'>
                <button className="primary-btn rounded-3xl py-2 px-12">Claim</button>
              </div>
            </div>
          }
        </TabPanel>
      }
    </Box>
  );
});

export default memo(CFEDInfo)