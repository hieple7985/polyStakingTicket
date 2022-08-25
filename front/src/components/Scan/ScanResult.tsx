import { Html5QrcodeResult } from 'html5-qrcode/esm/core';
import React, {memo, useEffect, useState} from 'react'
import { useMutation } from '@apollo/client';
import { ApproveDataInterface, APPROVE_TICKET } from '../../api/mutations/approveTicket';

import { useAccountStore } from '../../context/AccountProvider';
import ScanResultDone from './ScanModal/ScanResultDone';
import ScanResultProcessing from './ScanModal/ScanResultProcessing';
import { observer } from 'mobx-react-lite';

interface ResultObject {
  ticket_id: number,
  owner_address: string,
  status: number,
  user_create_ticket: string,
}

interface Props {
  results: Html5QrcodeResult;
  setResults: React.Dispatch<React.SetStateAction<Html5QrcodeResult | undefined>>
}


const ScanResult: React.FC<Props> = observer(({results, setResults}: Props): React.ReactElement => {
  const userData = useAccountStore();
  const [notResult, setNotResult] = useState<boolean>(false);
  const [resultObject, setResultObject] = useState<ResultObject | undefined>()
  const [status, setStatus] = useState<ApproveDataInterface | undefined>();
  
  const [setApproveTicket, { loading, error }] = useMutation(APPROVE_TICKET)

  useEffect(() => {
    try {
      setResultObject(JSON.parse(window.atob(results.decodedText)));
    }
    catch(e) {
      console.log(e);
      setNotResult(true);
    }
  }, [])

  useEffect(() => {
    if(resultObject) {
      setApproveTicket({
        variables: {
          tokenID: resultObject.ticket_id,
          userID: userData.store.account.id,
        },
        onCompleted: (data) => {
          setStatus(data);
        }
      })
    }
  }, [resultObject])

  if (notResult) return <ScanResultDone isWrongCode={true} setResults={setResults}/>
  
  if (loading) return <ScanResultProcessing />

  if (error) return <ScanResultDone isError={true} setResults={setResults}/>

  return (
    <>
      {status
      ? 
        (
          (status.approveTicket.data.mes === 0 &&
            <ScanResultDone isWrongApprover={true} setResults={setResults}/>
          ) ||
          (status.approveTicket.data.mes === 1 &&
            <ScanResultDone isComplete={true} setResults={setResults}/>
          ) ||
          (status.approveTicket.data.mes === 2 &&
            <ScanResultDone isUsed={true} setResults={setResults}/>
          ) ||
          (status.approveTicket.data.mes === 3 &&
            <ScanResultDone isExpired={true} setResults={setResults}/>
          ) ||
          <ScanResultDone isError={true} setResults={setResults}/>
        ) 
      :
        <ScanResultDone isError={true} setResults={setResults}/>
      }
    </>
  )
});

export default memo(ScanResult)