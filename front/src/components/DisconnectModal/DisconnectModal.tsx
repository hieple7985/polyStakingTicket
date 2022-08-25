import React, { memo } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import './Disconnect.css'
import IMG_EXIT from '../../assets/images/disconnect-btn-2.png'
import { useAccountStore } from '../../context/AccountProvider'
import { observer } from 'mobx-react-lite';

interface Props {
  setExit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Disconnect: React.FC<Props> = observer((props: Props): React.ReactElement => {
  const userData = useAccountStore();
  const navigate: NavigateFunction = useNavigate();

  const confirmExit = (): void => {
    props.setExit(false);
    localStorage.setItem('_NTS_V4_isLogin', JSON.parse('false'))
    userData.store.addAccount(
      {
        id: '',
        user: '',
        img: '',
        fetch: true,
        balance: -1,
      }
    )
    navigate('/login');
  }

  const cancelExit = (): void => {
    props.setExit(false);
  }

  return (
    <section
      className='modal-wrap'
    >
      <div
        className='modal-bg'
        onClick={cancelExit}
      ></div>
      <div
        className='fixed-comp modal'
      >
        <div className='mt-16'>
          <img src={IMG_EXIT} alt="Exit" className='object-cover h-12' />
        </div>
        <div className='mt-10'>
          <p className='font-semibold text-xl'>Are you sure you want to disconnect?</p>
        </div>
        <div className='dis-btn w-10/12 flex justify-between mt-10 mb-10'>
          <button className='secondary-btn' onClick={() => cancelExit()}>
            Cancel
          </button>
          <button className='primary-btn ml-4' onClick={() => confirmExit()}>
            Yes
          </button>
        </div>
      </div>
    </section>
  )
});

export default memo(Disconnect)