import { action, makeObservable, observable } from 'mobx'

export interface AccountInfo {
  id: string,
  user: string,
  img: string,
  balance: number
  fetch: boolean
}

export class AccountStore {
  account: AccountInfo = {
    id: '',
    user: '',
    img: '',
    balance: -1,
    fetch: false,
  }

  constructor() {
    makeObservable(this, {
      account: observable,
      addAccount: action,
    })
  }

  addAccount(newAccount: AccountInfo) {
    this.account = newAccount;
  }
}
