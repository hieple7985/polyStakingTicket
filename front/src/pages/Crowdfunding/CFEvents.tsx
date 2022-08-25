import React, { useEffect, useState } from 'react'
import CFEventList from '../../components/Crowdfunding/CFEvent/CFEventList';
import SubHeader from '../../components/SubHeader/SubHeader';
import CFCategoriesSlider from '../../components/Crowdfunding/CFCategories/CFCategoriesSlider';
import { useLazyQuery } from '@apollo/client';
import { GET_CF_EVENTS_BY_STATUS, CFEventInterface, GET_CF_EVENTS_BY_PARTICIPANT } from '../../api/queries/getCFEvent';
import LoadingField from '../../components/LoadingField/LoadingField';
import { observer } from 'mobx-react-lite';
import { useAccountStore } from '../../context/AccountProvider';

const CFEvents: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore();
  const [cfStatus, setCFStatus] = useState<number>(1);
  const [cfEvents, setCFEvents] = useState<CFEventInterface[]>([]);

  const [loadCFEventsByStatus, {loading, error}] = useLazyQuery(GET_CF_EVENTS_BY_STATUS, {
    onCompleted: (data) => {
      setCFEvents(data.cfEvents);
    },
    fetchPolicy: 'no-cache',
  })
  const [loadCFEventsByParticipant, {loading: loading2, error: error2}] = useLazyQuery(GET_CF_EVENTS_BY_PARTICIPANT, {
    onCompleted: (data) => {
      setCFEvents(data.cfEvents);
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (cfStatus !== 9999) {
      loadCFEventsByStatus({
        variables: {
          status: cfStatus,
        },
      })
    }
    else {
      loadCFEventsByParticipant({
        variables: {
          userID: userData.store.account.id,
        }, 
      })
    }
  }, [cfStatus])

  if (error || error2) {
    console.log(error || error2);
  }

  return (
    <div className='wrap border-x-only'>
        <section className='container'>
          <SubHeader pageName="Crowdfunding Events" rootURL="/home" />
          <article className='w-full mt-10'>
            <CFCategoriesSlider cfStatus={cfStatus} setCFStatus={setCFStatus}/>
          </article>
          <article className='w-full mt-6'>
            {(loading || loading2)
            ?
              <LoadingField />
            :
              <>
                {(error || error2)
                ?
                  <p>Cannot load data!</p>
                :
                  <article className='w-full mb-12'>
                    {cfEvents.length > 0
                    ? 
                      <CFEventList cfEvents={cfEvents}/>
                    : 
                      cfStatus === 9999 && 
                      <p className='mt-24 text-center text-3xl w-full mx-auto text-gray-400'>
                        You haven’t participated any crowdfunding event yet.
                      </p>
                    }
                  </article>
                }
              </>
            }
          </article>
        </section>
      </div>
  )
});

export default CFEvents