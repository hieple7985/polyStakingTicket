import React, { memo, useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client';
import { useAccountStore } from '../../../context/AccountProvider'
import LoadingField from '../../LoadingField/LoadingField'
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../../../api/mutations/handleFavourite';
import { observer } from 'mobx-react-lite';
import {FavouritedDataInterface, GET_FAVOURITED_DATA_BY_TICKET_AND_USER } from '../../../api/queries/getFavourtiedData';

interface Props {
  hideFavourite?: boolean,
  ticketID: number,
}

const TicketFavouriteDetail: React.FC<Props> = observer(({hideFavourite, ticketID}: Props): React.ReactElement => {
  const userData = useAccountStore();
  const [favourited, setFavourited] = useState<FavouritedDataInterface[]>([]);
  const [loadFavourite, {loading, error}] = useLazyQuery(GET_FAVOURITED_DATA_BY_TICKET_AND_USER, {
    variables: {
      userID: userData.store.account.id,
      ticketID: ticketID,
    },
    onCompleted: (data) => {
      setFavourited(data.collection)
    },
    fetchPolicy: "no-cache",
  })
  
  useEffect(() => {
    loadFavourite();
  },[])

  const [addFavourite, {loading: loading2, error: error2}] = useMutation(ADD_FAVOURITE);

  const [removeFavourite, {loading: loading3, error: error3}] = useMutation(REMOVE_FAVOURITE);

  const handleAddFavourite = (): void => {
    addFavourite({
      variables: {
        userID: userData.store.account.id,
        ticketID: ticketID,
      },
      onCompleted: () => {
        loadFavourite();
      },
    })
  }

  const handleRemoveFavourite = (): void => {
    removeFavourite({
      variables: {
        userID: userData.store.account.id,
        ticketID: ticketID,
      },
      onCompleted: () => {
        loadFavourite();
      },
    })
  }

  if (loading || loading2 || loading3) return <LoadingField />

  if (error || error2) {
    console.log(error || error2 || error3);
    return <>ERROR!</>
  }
  return (
    <>
      {hideFavourite 
        ?
          <></>
        :
          favourited.length > 0 
          ?
            <button 
              className='w-44 text-xl font-semibold text-white bg-primaryColor py-2 px-2 border border-solid rounded-3xl border-primaryColor'
              onClick={handleRemoveFavourite}
            >
              Favourited
            </button>
          :
            <button 
              className='w-44 text-xl font-semibold text-primaryColor py-2 px-2 border border-solid rounded-3xl border-primaryColor'
              onClick={handleAddFavourite}
            >
              Add to Favourite
            </button>
        }
    </>
  )
});

export default memo(TicketFavouriteDetail)