import React, { useState } from 'react'

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/Search/SearchBar/SearchBar';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import ModalUser from '../../components/Header/ModalUser';
import ModalWallet from '../../components/Header/ModalWallet';
import SwitchEventType from '../../components/SwitchEventType/SwitchEventType';

const Search: React.FC = (): React.ReactElement => {
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [searchContent, setSearchContent] = useState<string>('');
  const [eventType, setEventType] = useState<number>(1);

  return (
    <div className='wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal}/>
      )}
      <div className='container'>
        <section id="header" className='fixed-comp fixed top-0 pb-6'>
          <div className='w-11/12'>
            <Header setWalletModal={setWalletModal} setUserModal={setUserModal}/>
            <div className='mt-10 flex justify-end'>
              <SwitchEventType eventType={eventType} setEventType={setEventType}/>
            </div>
            <SearchBar searchContent={searchContent} setSearchContent={setSearchContent}/>
            
          </div>
        </section>
        <section className='w-full mt-64'>
          {searchContent &&
            <SearchResult searchContent={searchContent} eventType={eventType}/>
          }
        </section>
        
        <Footer activePage='search'/>
      </div>
    </div>
  )
}

export default Search