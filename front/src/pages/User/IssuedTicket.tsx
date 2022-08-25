import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite';

import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketOverview from '../../components/TicketContent/Overview/TicketOverview';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import ErrorPage from '../../components/Error/Error';


import { useAccountStore } from '../../context/AccountProvider';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import {TicketInterface, GET_TICKET_BY_ID } from '../../api/queries/getTickets';


const IssuedTicket: React.FC = observer((): React.ReactElement => {
  const [ticket, setTicket] = useState<TicketInterface[]>([])
  const userData = useAccountStore()
  const {userName, eventID, id} = useParams();

  if (userName !== userData.store.account.user) return <ErrorPage />

  const { loading, error } = useQuery(GET_TICKET_BY_ID, {
    variables: {
      id: id && parseInt(id),
    },
    skip: id === undefined || isNaN(parseInt(id)),
    onCompleted: (data) => {
      setTicket(data.tickets)
    }
  })

  if (loading) return <Loading />

  if (error) {
    console.log(error);
    return <ErrorPage />
  }

  return (
    <>
      {ticket.length > 0 
      ?
      <div className='wrap border-x-only min-h-screen'>
        <TicketHeader image={ticket[0].image} rootURL={`/user/${userName}/issued_event/${eventID}`}/>
        <div className='w-11/12 mx-auto flex flex-col items-center relative'>
          {/* Ticket Overview */}
            <TicketOverview ticket={ticket[0]} />
          {/* Ticket Details */}
          <section className='w-full mt-10 border-t border-solid border-gray-100 mb-32'>
            <TicketDetails ticket={ticket[0]} />
          </section>
        </div>
      </div>
      :
        <ErrorPage />
      }
    </>
  )
});


export default IssuedTicket