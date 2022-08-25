import React, { memo } from 'react'

import EventList from '../../../ActiveEvent/EventList/EventList';
import { useAccountStore } from '../../../../context/AccountProvider';
import { observer } from 'mobx-react-lite';
import { EventInterface } from '../../../../api/queries/getEvents';

interface Props {
  events?: EventInterface[];
}

const Issued: React.FC<Props> = observer((props: Props): React.ReactElement => {
  const userData = useAccountStore()

  return (
    <article className='mb-36 mt-10'>
      {props.events
        ?
          <EventList events={props.events} ownerAddress={userData.store.account.user} />
        :
          <div className='stat-null'>You haven’t issued any event yet.</div>
      }
    </article>
  )
});

export default memo(Issued)