import React, { useContext, useEffect, createContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { AccountStore } from '../store/AccountStore';
import { InitialMetamask, RequestNetWork } from '../util/ProviderMetamask';
import { observer } from 'mobx-react-lite';
import { injected } from '../util/connectors'
import { useWeb3React } from '@web3-react/core'
import detectEthereumProvider from '@metamask/detect-provider';

interface Props {
  store: AccountStore,
  children: React.ReactElement,
}
interface CurrentAccount {
  store: AccountStore
}

const AccountContext = createContext<CurrentAccount>({
  store: new AccountStore()
});

const AccountProvider: React.FC<Props> = observer(({ store, children }: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const { active: networkActive, error: networkError, activate: activateNetwork, chainId, account } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const autoConnect = async () => {
      const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider) {
        injected
          .isAuthorized()
          .then((isAuthorized: any) => {
            setLoaded(true)
            if (isAuthorized && !networkActive && !networkError) {
              activateNetwork(injected)
            }
          })
          .catch(() => {
            setLoaded(true)
          })
        if (account && chainId != 137) {
          alert('Switch To Polygon')
          RequestNetWork()
        }
      }
    }
    autoConnect()
  }, [])

  useEffect(() => {
    setLoaded(false)
    const initalWalletData = async () => {
      await InitialMetamask({ store, navigate, account, chainId });
      setLoaded(true)
    }
    initalWalletData()

  }, [account, chainId]);
  if (!loaded) return <Loading />
  return (
    <AccountContext.Provider value={{ store }}>
      {
        children
      }
    </AccountContext.Provider>
  )
});

export const useAccountStore = () => useContext(AccountContext);

export default AccountProvider