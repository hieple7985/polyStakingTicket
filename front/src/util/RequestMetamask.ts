import detectEthereumProvider from "@metamask/detect-provider";
import { client } from "../api/client";
import { CREATE_USER } from "../api/mutations/createUser";
import { GET_DATA_ACCOUNT } from '../api/queries/getDataAccount';
import Web3 from 'web3'
import { AccountStore } from '../store/AccountStore';
import { NavigateFunction } from "react-router-dom";

interface Params {
  store: AccountStore
  navigate: NavigateFunction
  account: string
}
export default async ({ store, navigate, account }: Params) => {
  const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });

  if (provider) {
    const web3 = new Web3(provider)
    try {
      // Exist account from wallet metamask
      if (account) {
        localStorage.setItem('_NTS_V4_isLogin', JSON.parse('true'))
        const balance = web3.utils.fromWei(
          await web3.eth.getBalance(account),
          "ether"
        );

        const accountFromWallet = account

        const accountFetch: any = await client
          .query({
            query: GET_DATA_ACCOUNT,
            variables: {
              wallet_address: accountFromWallet
            },
            fetchPolicy: 'no-cache',
          })
          .catch((err) => console.error(err));
        // Account exist
        if (accountFetch && accountFetch.data.UserNonce[0] && accountFetch.data.UserNonce[0].UserWallet && accountFetch.data.UserNonce[0].UserWallet.wallet_address) {
          console.log('Account exist', accountFetch.data);
          store.addAccount({
            ...store.account,
            user: accountFromWallet,
            id: accountFetch.data.UserNonce[0].id,
            balance: Number(balance),
            fetch: true
          })
          navigate('/home')
        }

        // Create new Account
        else {
          console.log('Create new Account');
          const accountFetchNewAccount: any = await client
            .mutate({
              mutation: CREATE_USER,
              variables: {
                wallet_address: accountFromWallet
              },
            })
            .catch((err) => console.error(err));
          if (accountFetchNewAccount) {
            store.addAccount({
              ...store.account,
              user: accountFromWallet,
              id: accountFetchNewAccount.data.createWallet.user_id,
              balance: Number(balance),
              fetch: true
            })
            navigate('/home')
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("Please install MetaMask");
  }
}