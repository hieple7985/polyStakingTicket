import React, { memo, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';

import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useAccountStore } from '../../../../context/AccountProvider';

import './OverviewItem.css'
import { useMutation } from '@apollo/client';
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../../../../api/mutations/handleFavourite';
import LoadingField2 from '../../../LoadingField/LoadingField2';
import { FavouriteTicketListInterface } from '../../../../api/queries/getFavouriteTicketList';

interface Props {
  ticketID: number,
  favouriteTicketList?: FavouriteTicketListInterface[],
}

const TicketFavourite: React.FC<Props> = observer(({ticketID, favouriteTicketList}: Props): React.ReactElement => {
  const userData = useAccountStore();
  const [isFavourite, setFavourite] = useState<boolean>(false);

  const checkFavouriteTicketList = (userID: number, ticketID: number): boolean => {
    let checker = false;
    if (favouriteTicketList) {
      favouriteTicketList.forEach(favouriteTicket => {
        if (favouriteTicket.user === userID && favouriteTicket.ticketID === ticketID) {
          checker = true;
          return true;
        }
      })
    }
    return checker;
  }
  
  useEffect(() => {
    setFavourite(checkFavouriteTicketList(parseInt(userData.store.account.id), ticketID));
  }, [favouriteTicketList])

  

  const [addFavourite, {loading, error}] = useMutation(ADD_FAVOURITE, {
    variables: {
      userID: userData.store.account.id,
      ticketID: ticketID,
    },
    onCompleted: () => {
      setFavourite(true);
    }
  })

  const [removeFavourite, {loading: loading2, error: error2}] = useMutation(REMOVE_FAVOURITE, {
    variables: {
      userID: userData.store.account.id,
      ticketID: ticketID,
    },
    onCompleted: () => {
      setFavourite(false);
    }
  })

  const handleFavourite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    if (isFavourite) {
      removeFavourite();
    }
    else {
      addFavourite();
    }
  }

  if (loading || loading2) {
    return (
      <div 
        className='mb-1' 
        style={{marginRight: "-2px"}}
        onClick={e => e.stopPropagation()}
      >
        <LoadingField2 />
      </div>
    )
  } 

  if (error || error2) return <>Error!</>

  return (
    <>
      <button className='favourite-btn' onClick={(e) => handleFavourite(e)}>
        {isFavourite
        ?
          <i className='text-xl text-primaryColor'><BsHeartFill /></i>
        :
          <i className='text-xl text-primaryColor'><BsHeart /></i>
        }
      </button>
    </>
  )
});

export default memo(TicketFavourite)