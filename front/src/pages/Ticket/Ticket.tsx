import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketOverview from '../../components/TicketContent/Overview/TicketOverview';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import BuyFooter from '../../components/TicketContent/TicketFooter/BuyFooter';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';
import {TicketInterface, GET_TICKET_BY_ID } from '../../api/queries/getTickets';
import EventInfoBtn from '../../components/EventInfo/EventInfoBtn';
import EventInfo from '../../components/EventInfo/EventInfo';

const Ticket: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()
  const {id, eventID} = useParams();
  const [ticket, setTicket] = useState<TicketInterface[]>([]);
  const [showEventInfo, setShowEventInfo] = useState<boolean>(false);
  const { loading, error, data } = useQuery(GET_TICKET_BY_ID, {
    variables: {
      id: (id && parseInt(id)),
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

  if (data) {
    if (!eventID || data.tickets[0].event.id !== parseInt(eventID)) return <ErrorPage />;
  }

  if (showEventInfo) {
    return (
      <EventInfo setShowEventInfo={setShowEventInfo} ticket={ticket[0]}/>
    )
  }

  return (
    <>
      {ticket.length > 0 && 
        (
          <div className='wrap border-x-only min-h-screen'>
            <div className='relative'>
              <TicketHeader image={ticket[0].image} rootURL="-1"/>
              <EventInfoBtn setShowEventInfo={setShowEventInfo} />
            </div>
            <div className='container relative'>
              {/* Ticket Overview */}
                <TicketOverview ticket={ticket[0]} />
              {/* Ticket Details */}
              <section className='w-full mt-10 border-t border-solid border-gray-100 mb-32'>
                <TicketDetails ticket={ticket[0]} />
              </section>
              {userData.store.account.user !== ticket[0].event.owner && 
              ticket[0].event.status === 1 && 
              ticket[0].status === 1 &&
                <BuyFooter ticket={ticket[0]} />
              }
            </div>
          </div>
        )
      }
    </>
  )
});

export default Ticket