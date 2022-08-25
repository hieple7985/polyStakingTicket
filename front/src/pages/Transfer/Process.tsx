import React from 'react'
import ProcessingTransfer from '../../components/TransferTicket/ProcessingTransfer'
import TransferComplete from '../../components/TransferTicket/TransferComplete';
import { NavigateFunction, useNavigate } from 'react-router-dom';
interface Props {
  loading: undefined | boolean,
  data: undefined | string,
}
const Process: React.FC<Props> = ({ loading, data }: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }



  return (
    <div className='wrap border-x-only'>
      <section className='container'>
        {
          loading &&
          <ProcessingTransfer />
        }

        {
          data &&
          <>
            <TransferComplete />
            <section
              className='fixed-comp sub-footer'
            >
              <div className='footer-full-w-btn w-11/12'>
                <button
                  className='primary-btn'
                  onClick={() => handleNavigate('/home')}
                >
                  OK
                </button>
              </div>
            </section>
          </>
        }

      </section>
    </div>
  )
}

export default Process