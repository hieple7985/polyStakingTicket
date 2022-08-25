import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ProcessingSell from '../../components/SellTicket/ProcessingSell';
import SellComplete from '../../components/SellTicket/SellComplete';
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
          <ProcessingSell />
        }

        {
          data &&
          <>
            <SellComplete />
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