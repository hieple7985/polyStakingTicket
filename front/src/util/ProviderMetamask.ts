import detectEthereumProvider from "@metamask/detect-provider";
import { NavigateFunction } from "react-router-dom";
import Web3 from "web3";
import { GET_DATA_ACCOUNT } from "../api/queries/getDataAccount";
import { AccountStore } from '../store/AccountStore';
import { client } from "../api/client";
import { injected } from "./connectors";

interface Params {
  navigate: NavigateFunction
}
const { ethereum }: any = window

export const RequestNetWork = async () => {
  const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });
  await provider.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x89", // Polygon chainId is 137, which is 0x89 in hex
        chainName: "Polygon",
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com"],
        blockExplorerUrls: ["https://polygonscan.com"]
      },
    ]
  })
}

// export const ListenerAccount = async ({ navigate }: Params) => {
//   if (ethereum) {
//     const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });
//     const onChainChanged = async () => {
//       const chainId = await provider.request({
//         method: 'eth_chainId',
//       });
//       if (chainId !== '0x89') {
//         RequestNetWork()
//       }
//       window.location.reload();
//     }
//     const onAccountsChanged = async () => {
//       const accounts = await ethereum.request({
//         method: 'eth_accounts',
//       });
//       if (accounts && accounts[0]) {
//         navigate('/home')
//         window.location.reload();
//       }
//       else {
//         // account is disconnected
//         localStorage.setItem('_NTS_V4_isLogin', JSON.parse('false'))
//         navigate('/login')
//         window.location.reload();
//       }
//     }
//     ethereum.on('chainChanged', onChainChanged);
//     ethereum.on('accountsChanged', onAccountsChanged);
//     // ethereum.removeListener('chainChanged', onChainChanged);
//     // ethereum.removeListener('accountsChanged', onAccountsChanged);
//   }
// }
interface InitialMetamaskDataT {
  store: AccountStore
  navigate: NavigateFunction
  account: string | null | undefined
  chainId: number | undefined
  // loading: boolean
}
export const InitialMetamask = async ({ store, navigate, account, chainId }: InitialMetamaskDataT) => {
  const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });

  if (provider && ethereum) {
    const web3 = new Web3(provider)
    // Polygon chainId is 137, which is 0x89 in hex

    // Case Account exist
    if (account) {
      if (chainId === 137) {
        // GET balance from wallet
        const balance = web3.utils.fromWei(
          await web3.eth.getBalance(account),
          "ether"
        );
        // check account is exist in database
        const accountFetch = await client.query({
          query: GET_DATA_ACCOUNT,
          variables: {
            wallet_address: account
          }
        })

        if (accountFetch && accountFetch.data.UserNonce[0] && accountFetch.data.UserNonce[0].UserWallet && accountFetch.data.UserNonce[0].UserWallet.wallet_address) {
          console.log('Account exist', accountFetch.data);
          store.addAccount({
            ...store.account,
            user: account,
            id: accountFetch.data.UserNonce[0].id,
            balance: Number(balance),
            fetch: true
          })
        }
        else {
          navigate('/login')
        }
      }
      else {
        RequestNetWork()
      }
    }
    else {
      const loginAlreadyThisPage = await injected
        .isAuthorized()
      if (store.account.fetch || !loginAlreadyThisPage) {
        navigate('/login')
      }

      store.addAccount({
        ...store.account,
        fetch: true
      })
    }

  } else {
    alert('MetaMask not detected');
  }

};