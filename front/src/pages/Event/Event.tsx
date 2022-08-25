import React, { useEffect, useState } from 'react'

import './Event.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalUser from '../../components/Header/ModalUser';
import ModalWallet from '../../components/Header/ModalWallet';

import { ApolloError, useLazyQuery } from '@apollo/client';

import { useAccountStore } from '../../context/AccountProvider';
import LoadingField from '../../components/LoadingField/LoadingField';

import { observer } from 'mobx-react-lite';
import { EventInterface, GET_AVAILABLE_EVENTS_BY_USER, GET_EVENTS_BY_USER } from '../../api/queries/getEvents';
import AddEventBtn from '../../components/Event/AddEventBtn';
import SwitchEventType from '../../components/SwitchEventType/SwitchEventType';
import { GET_CF_EVENTS_BY_OWNER, CFEventInterface } from '../../api/queries/getCFEvent';
import TraditionalEvents from '../../components/Event/TraditionalEvents';
import CrowdfundingEvents from '../../components/Event/CrowdfundingEvents';

const EventPage: React.FC = observer((): React.ReactElement => {

  const userData = useAccountStore()
  const [isCheck, setCheck] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [cfEvents, setCFEvents] = useState<CFEventInterface[]>([]);
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const [eventType, setEventType] = useState<number>(1);
  const [errorState, setErrorState] = useState<ApolloError | undefined>();

  const [loadAvalableEvents, { loading }] = useLazyQuery(GET_AVAILABLE_EVENTS_BY_USER, {
    variables: {
      userName: userData.store.account.user
    },
    onCompleted: (data) => {
      setEvents(data.events);
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: "no-cache",
  });

  const [loadAllEvents, { loading: loading2 }] = useLazyQuery(GET_EVENTS_BY_USER, {
    variables: {
      userName: userData.store.account.user
    },
    onCompleted: (data) => {
      setEvents(data.events);
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: "no-cache",
  });

  const [loadAllCFEvents, {loading: loading3 }] = useLazyQuery(GET_CF_EVENTS_BY_OWNER, {
    variables: {
      owner: userData.store.account.user
    },
    onCompleted: (data) => {
      console.log(data);
      setCFEvents(data.cfEvents);
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: "no-cache",
  })

  useEffect(() => {
    setErrorState(undefined);
    if (eventType === 1) {
      if (isCheck) {
        loadAvalableEvents();
      }
      else {
        loadAllEvents();
      }
    }
    else if (eventType === 2) {
      loadAllCFEvents();
    }
  }, [isCheck, eventType])

  return (
    <div className='event-content wrap border-x-only relative'>
      {/* Modals */}
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal} />
      )}
      <section id="header" className='fixed-comp fixed top-0'>
        <div className='w-11/12'>
          <Header setWalletModal={setWalletModal} setUserModal={setUserModal} />
        </div>
      </section>
      
      {/* Main content */}
      <div className='container'>
        <section className='mt-28'>
          <h3 className='text-2xl font-bold'>Event</h3>
        </section>
        <section className='mt-6'>
          <SwitchEventType eventType={eventType} setEventType={setEventType}/>
        </section>
        <section className=''>
          {(loading || loading2 || loading3) 
          ? 
            <div className='mt-12'>
              <LoadingField />
            </div>
          :
            (errorState) 
            ? 
              <p>Error: Cannot load events!</p>
            : 
              <>
                {((eventType === 1 && (isCheck || events.length > 0)) || 
                (eventType === 2 && cfEvents.length > 0)) &&
                  <AddEventBtn eventType={eventType}/>
                }
                
                {/* Traditional event screen */}
                {eventType === 1
                ? (
                  <TraditionalEvents events={events} isCheck={isCheck} setCheck={setCheck}/>
                )
                :
                  // Crowdfunding event screen
                  eventType === 2 && (
                    <CrowdfundingEvents cfEvents={cfEvents} />
                  )
                }
              </>
          }
        </section>
      </div>
      
      <Footer activePage='event' />
    </div>
  )
});

export default EventPage