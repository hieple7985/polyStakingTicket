import React, { useState, useEffect, memo } from 'react'
import { ApolloError, useLazyQuery } from '@apollo/client';

import EventList from '../../ActiveEvent/EventList/EventList';
import SearchNotFound from './SearchNotFound';
import LoadingField from '../../LoadingField/LoadingField';
import {EventInterface, GET_EVENTS_BY_SEARCH, GET_EVENTS_BY_SEARCH_AND_CATE } from '../../../api/queries/getEvents';
import CategorySlider from '../../CategorySlider/CategorySlider';
import CFCategoriesSlider from '../../Crowdfunding/CFCategories/CFCategoriesSlider';
import { GET_CF_EVENTS_BY_SEARCH_AND_STATUS, GET_CF_EVENTS_BY_SEARCH_AND_OWNER, CFEventInterface } from '../../../api/queries/getCFEvent';
import { observer } from 'mobx-react-lite';
import { useAccountStore } from '../../../context/AccountProvider';
import CFEventList from '../../Crowdfunding/CFEvent/CFEventList';

interface Props {
  eventType: number;
  searchContent: string;
}

const SearchResult: React.FC<Props> = observer(({searchContent, eventType}: Props): React.ReactElement => {
  
  const userData = useAccountStore();
  const [categoryID, setCategoryID] = useState<number>(-1);
  const [cfStatus, setCFStatus] = useState<number>(1);
  const [searchResult, setSearchResult] = useState<EventInterface[]>([]);
  const [searchCFResult, setSearchCFResult] = useState<CFEventInterface[]>([]);
  const [errorState, setErrorState] = useState<ApolloError | undefined>();
  
  const [loadSearchEvents, {loading}] = useLazyQuery(GET_EVENTS_BY_SEARCH, {
    onCompleted: (data) => setSearchResult(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });
  
  const [loadSearchEventsByCate, {loading: loading2}] = useLazyQuery(GET_EVENTS_BY_SEARCH_AND_CATE, {
    onCompleted: (data) => setSearchResult(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  const [loadSearchCFEventsByStatus, {loading: loading3}] = useLazyQuery(GET_CF_EVENTS_BY_SEARCH_AND_STATUS, {
    onCompleted: (data) => {
      setSearchCFResult(data.cfEvents)
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  const [loadSearchCFEventsByOwner, {loading: loading4}] = useLazyQuery(GET_CF_EVENTS_BY_SEARCH_AND_OWNER, {
    onCompleted: (data) => {
      setSearchCFResult(data.cfEvents)
    },
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  })
  
  useEffect(() => {
    setErrorState(undefined);
    if (eventType === 1) {
      if (categoryID === -1) {
        loadSearchEvents({
          variables: {
            search: `%${searchContent}%`
          }
        });
      }
      else {
        loadSearchEventsByCate(
          {variables: 
            {
              search: `%${searchContent}%`, 
              categoryID: categoryID
            }
          });
      }
    }

    else if (eventType === 2) {
      if (cfStatus !== 9999) {
        loadSearchCFEventsByStatus({
          variables: {
            search: `%${searchContent}%`,
            status: cfStatus,
          }
        })
      }
      else {
        loadSearchCFEventsByOwner({
          variables: {
            search: `%${searchContent}%`,
            owner: userData.store.account.user, 
          }
        })
      }
    }
  }, [searchContent, eventType, categoryID, cfStatus])

  if (loading || loading2 || loading3 || loading4) {
    return <div className='mt-12'><LoadingField /></div>
  }

  if (errorState) {
    console.log(errorState);
    return <p>Something has gone wrong!</p>
  }

  return (
    <>
      <div className='mb-6'>
        {eventType === 1 &&
          <CategorySlider categoryID={categoryID} setCategoryID={setCategoryID} />
        }
        {eventType === 2 &&
          <CFCategoriesSlider cfStatus={cfStatus} setCFStatus={setCFStatus} />
        }
      </div>

      <article className='flex justify-between items-center'>
            <p className='font-light text-gray-800'>
              Search Results
            </p>
            <p className='font-semibold text-primaryColor'>
              {eventType === 1 ? searchResult.length : searchCFResult.length} found
            </p>
          </article>
      
      {eventType === 1 && searchResult.length > 0
      ?
        <article className='w-full mt-4 mb-36'>
          <div className='mt-4'>
            <EventList events={searchResult} />
          </div>
        </article>
      : 
        eventType === 2 && searchCFResult.length > 0
        ?
          <article className='w-full mt-4 mb-36'>
            <div className='mt-4'>
              <CFEventList cfEvents={searchCFResult} />
            </div>
          </article>
        :
          <SearchNotFound />
      }
    </>

  ) 
});

export default memo(SearchResult)