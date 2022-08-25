import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery, ApolloError } from '@apollo/client';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserInfomation from '../../components/User/UserInfo/UserInfo';
import StatisticContent from '../../components/User/UserStatistics/StatisticContent';
import StatisticHeader from '../../components/User/UserStatistics/StatisticHeader';


import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';
import { EventInterface, GET_EVENTS_BY_USER } from '../../api/queries/getEvents';
import { TicketInterface, GET_BOUGHT_TICKETS_BY_OWNER } from '../../api/queries/getTickets';
import { FavouriteTicketListInterface, GET_FAVOURITE_TICKET_LIST_BY_USER } from '../../api/queries/getFavouriteTicketList';
import { CFEventInterface, GET_CF_EVENTS_BY_OWNER, GET_CF_EVENTS_BY_PARTICIPANT } from '../../api/queries/getCFEvent';



const User: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()
  const {userName} = useParams()
  const [errorState, setErrorState] = useState<ApolloError | undefined>();
  const [statType, setStatType] = useState('issued');
  const [issuedEvents, setIssuedEvents] = useState<EventInterface[] | undefined>()
  const [boughtTickets, setBoughtTickets] = useState<TicketInterface[] | undefined>()
  const [favouriteList, setFavouriteList] = useState<FavouriteTicketListInterface[]>([]);
  
  const [cfType, setCFType] = useState<number>(1);
  const [cfEvents, setCFEvents] = useState<CFEventInterface[]>([]);
  
  const [loadCFEventsByOwner, { loading: loadingCFEvent1 }] = useLazyQuery(GET_CF_EVENTS_BY_OWNER);
  const [loadCFEventsByParticipant, { loading: loadingCFEvent2 }] = useLazyQuery(GET_CF_EVENTS_BY_PARTICIPANT);


  useEffect(() => {
    if (cfType === 1) {
      loadCFEventsByOwner({
        variables: {
          owner: userData.store.account.user,
        },
        onCompleted: (data) => {
          setCFEvents(data.cfEvents);
        },
        onError: (error) => setErrorState(error),
        fetchPolicy: 'no-cache',
      })
    }
    else if (cfType === 2) {
      loadCFEventsByParticipant({
        variables: {
          userID: userData.store.account.id,
        },
        onCompleted: (data) => {
          setCFEvents(data.cfEvents);
        },
        onError: (error) => setErrorState(error),
        fetchPolicy: 'no-cache',
      })
    }
  }, [cfType])


  const { loading: loadingEvent } = useQuery(GET_EVENTS_BY_USER, {
    variables: {
      userName: userName,
    },
    skip: userName === null,
    onCompleted: (data) => {
      setIssuedEvents(data.events);
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: "no-cache"
  });

  const { loading: loadingBought } = useQuery(GET_BOUGHT_TICKETS_BY_OWNER, {
    variables: {
      ownerName: userName,
    },
    skip: userName === null,
    onCompleted: (data) => {
      setBoughtTickets(data.tickets);
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: "no-cache"
  });

  const { loading: loadingFavourite } = useQuery(GET_FAVOURITE_TICKET_LIST_BY_USER, {
    variables: {
      userID: userData.store.account.id,
      userName: userData.store.account.user,
    },
    onCompleted: (data) => {
      setFavouriteList(data.collection);
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: "no-cache"
  })


  if (loadingEvent || loadingBought  || loadingFavourite || loadingCFEvent1 || loadingCFEvent2) return <Loading />;

  if (errorState) {
    console.log(errorState);
    return <ErrorPage />
  }

  if (userData.store.account.user !== userName) return <ErrorPage />

  return (
    <>
      {userData && issuedEvents && boughtTickets &&
        <div className='wrap border-x-only relative'>
          <div className='container relative'>
            {/* Header */}
            <section id="header" className='fixed-comp fixed top-0'>
              <div className='w-11/12'>
                <Header isUserPage={true} />
              </div>
            </section>
            {/* User Info */}
            <section id="user-info" className='flex flex-col items-center mt-24'>
              <UserInfomation/>
            </section>
            {/* User Statistics */}
            <section className='mt-6'>
              <StatisticHeader 
                statType={statType} 
                setStatType={setStatType} 
                issuedEventAmount={issuedEvents.length}
                boughtTicketsAmount={boughtTickets.length}
                totalFavourite={favouriteList.length}
                cfEventAmount={cfEvents.length}
              />
              <StatisticContent 
                statType={statType}
                cfType={cfType}
                setCFType={setCFType}
                issuedEvents={issuedEvents} 
                boughtTickets={boughtTickets}
                favouriteTickets={favouriteList}
                cfEvents={cfEvents}
              />
            </section>
            {/* Footer */}
            <Footer activePage='user' />
          </div>
        </div>
      }
    </>
  )
});

export default User