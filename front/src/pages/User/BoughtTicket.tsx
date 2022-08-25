import React, { useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'


import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import BoughtFooter from '../../components/TicketContent/TicketFooter/BoughtFooter';
import BoughtTicketOverview from '../../components/TicketContent/Overview/BoughtTicketOverview';

import ErrorPage from '../../components/Error/Error';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading/Loading';

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';
import {TicketInterface, GET_BOUGHT_TICKET_BY_ID_AND_OWNER } from '../../api/queries/getTickets';
import EventInfoBtn from '../../components/EventInfo/EventInfoBtn';
import EventInfo from '../../components/EventInfo/EventInfo';

const BoughtTicket: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()
  const [ticket, setTicket] = useState<TicketInterface[]>([])
  const [showEventInfo, setShowEventInfo] = useState<boolean>(false);
  const {id, userName} = useParams();

  if (userData.store.account.user !== userName) return <ErrorPage />
  
  const { loading, error } = useQuery(GET_BOUGHT_TICKET_BY_ID_AND_OWNER, {
    variables: {
      ownerName: userName,
      ticketID: (id && parseInt(id))
    },
    skip: id === undefined || isNaN(parseInt(id)),
    onCompleted: (data) => {
      setTicket(data.tickets);
    },
    fetchPolicy: "no-cache"
  });

  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorPage />
  }

  if (showEventInfo) {
    return (
      <EventInfo setShowEventInfo={setShowEventInfo} ticket={ticket[0]}/>
    )
  }

  if (ticket.length > 0) {
    return (
      <div className='wrap border-x-only min-h-screen'>
        <div className='relative'>
          <TicketHeader image={ticket[0].image} rootURL={`/user/${userName}`} />
          <EventInfoBtn setShowEventInfo={setShowEventInfo} />
          </div>
          <div className='w-11/12 mx-auto flex flex-col items-center relative'>
            {/* Ticket Overview */}
              <BoughtTicketOverview ticket={ticket[0]}/>
            {/* Ticket Details */}
            <div className='w-full mt-10 border-t border-solid border-gray-100 mb-52'>
              <TicketDetails ticket={ticket[0]}/>
            </div>
            <BoughtFooter ticket={ticket[0]}/>
        </div>
      </div>
    )
  }
  else {
    return <ErrorPage />
  }
});

export default BoughtTicket
