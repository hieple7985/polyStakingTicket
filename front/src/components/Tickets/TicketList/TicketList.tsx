import { useQuery } from '@apollo/client';
import React, { useState, memo } from 'react'
import TicketListItem from './TicketListItem';
import ErrorPage from '../../Error/Error'
import LoadingField from '../../LoadingField/LoadingField';
import {FavouriteTicketListInterface, GET_FAVOURITE_TICKET_LIST_BY_USER } from '../../../api/queries/getFavouriteTicketList';
import { TicketInterface } from '../../../api/queries/getTickets';
import { useAccountStore } from '../../../context/AccountProvider';

interface Props {
  tickets: TicketInterface[],
}

const TicketList: React.FC<Props> = ({tickets}: Props): React.ReactElement => {
  const userData = useAccountStore();
  const [favouriteTicketList, setFavouriteTicketList] = useState<FavouriteTicketListInterface[]>([])

  const {loading, error} = useQuery(GET_FAVOURITE_TICKET_LIST_BY_USER, {
    variables: {
      userID: userData.store.account.id,
      userName: userData.store.account.user,
    },
    onCompleted: (data) => {
      setFavouriteTicketList(data.collection);
    },
    fetchPolicy: 'no-cache',
  });

  if (loading) return <div className='mt-6'><LoadingField /></div>

  if (error) return <ErrorPage />

  return (
    <>
      {tickets
      ?
        tickets.map(ticket => (
          <div key={ticket.id}>
            <TicketListItem ticket={ticket} favouriteTicketList={favouriteTicketList}/>
          </div>
        ))
      :
        <div>Error: Cannot load tickets!</div>
      }
    </>
  )
}

export default memo(TicketList)