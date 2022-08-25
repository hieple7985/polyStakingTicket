import { Html5QrcodeResult } from 'html5-qrcode/esm/core';
import React, { useState } from 'react';
import ScanQRCode from '../../components/Scan/ScanQRCode';
import ScanResult from '../../components/Scan/ScanResult';
import SubHeader from '../../components/SubHeader/SubHeader';

import './Scan.css'

const Scan: React.FC = (): React.ReactElement => {
  const [decodedResults, setDecodedResults] = useState<Html5QrcodeResult | undefined>()

  const onNewScanResult = (decodeText: string, decodedResult: Html5QrcodeResult ): void => {
    // console.log("App [result]: ", decodedResult);
    
    setDecodedResults(decodedResult);
  }

  return (
    <div className="wrap border-x-only relative">
      <section className='container'>
        <SubHeader pageName='Scan Ticket' rootURL='/home'/>
        {decodedResults 
        ?
          <div className='w-full mt-6 flex flex-col justify-center items-center '>
            <ScanResult results={decodedResults} setResults={setDecodedResults}/>
          </div>
        :
          <div className='mt-6 w-full'>
            <ScanQRCode 
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          </div>
        }
        
        
      </section>
    </div>
  );
}

export default Scan;
