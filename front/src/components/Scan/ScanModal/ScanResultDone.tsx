import { Html5QrcodeResult } from 'html5-qrcode/esm/core'
import React from 'react'

import IMG_COMPLETE from '../../../assets/images/issued_complete.png'
import IMG_ERROR from '../../../assets/images/search-not-found.png'

import '../../IssuingTicket/IssuingTicket.css'

interface Props {
  isComplete?: boolean,
  isError?: boolean,
  isWrongCode?: boolean,
  isWrongApprover?: boolean,
  isUsed?: boolean,
  isExpired?: boolean,
  setResults: React.Dispatch<React.SetStateAction<Html5QrcodeResult | undefined>>
}

const ScanResultDone: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
      <section className='modal-wrap'>
        <div className='modal-bg'></div>
        <div className='modal-complete fixed flex justify-center w-full'>
          <div className='w-11/12 mx-auto border border-solid 
          border-gray-300 bg-white rounded-2xl flex-col items-center py-6'>
            <div className='w-10/12 mx-auto'>
              {props.isComplete
              ?
                <img src={IMG_COMPLETE} alt="Complete" />
              :
                (props.isError || props.isWrongCode || props.isWrongApprover || props.isUsed) &&
                <img src={IMG_ERROR} alt="IMG_ERROR" />
              }
              <div className='text-center text-primaryColor font-semibold text-lg mt-6'>
                {props.isComplete &&
                  <p>Success: This ticket is valid!</p>
                }
                {props.isError &&
                  <p>Error: Cannot check this ticket!</p>
                }
                {props.isWrongCode &&
                  <p>Error: This is not a valid QR Code!</p>
                }
                {props.isWrongApprover &&
                  <p>Error: You don&apos;t have permission to approve this ticket!</p>
                }
                {props.isUsed &&
                  <p>Error: This ticket has been used!</p>
                }
                {props.isExpired &&
                  <p>Error: This ticket is expired!</p>
                }
              </div>
              <div className='footer-full-w-btn mt-6'>
                <button className='primary-btn' onClick={() => props.setResults(undefined)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ScanResultDone