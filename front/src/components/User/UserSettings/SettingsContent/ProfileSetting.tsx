import { observer } from 'mobx-react-lite';
import React, { memo } from 'react'
import { useParams } from 'react-router-dom';
import { useAccountStore } from '../../../../context/AccountProvider'
import ErrorPage from '../../../Error/Error';
import SubHeader from '../../../SubHeader/SubHeader'
import UserInfomation from '../../UserInfo/UserInfo'


const ProfileSetting: React.FC = observer((): React.ReactElement => {
  const {userName} = useParams();
  const userData = useAccountStore()

  if (userData.store.account.user !== userName) return <ErrorPage />
  
  return (
    <div className='wrap border-x-only'>
      <div className='container relative'>
        <section>
          <SubHeader pageName='Edit Username' rootURL={`/user/${userName}/settings`} />
        </section>
        <section className='flex flex-col items-center mt-10'>
          <UserInfomation />
        </section>
        <section className='flex flex-col items-center mt-20'>
          <div>
            <p className='text-sm text-center w-10/12 mx-auto'>
              To edit your wallet name, click on the button below 
              and follow the instructions at the website:
              <span className='block text-primaryColor font-semibold'>https://maticpolygon.com</span>
            </p>
          </div>
          <div className='w-full mt-10'>
            <a
              href="https://maticpolygon.com"
              className='block w-full text-center text-xl py-4 font-semibold 
              rounded-3xl bg-primaryColor text-white cursor-pointer opacity-80 
              hover:opacity-100'
            >
              Edit Name
            </a>
          </div>
        </section>
      </div>
    </div>
  )
});

export default memo(ProfileSetting)