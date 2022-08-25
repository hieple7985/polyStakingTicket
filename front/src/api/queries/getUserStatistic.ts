import { DocumentNode, gql } from "@apollo/client"

export interface UserStatisticInterface {
  id: number,
  totalMoneyOfMultiTimeTickets: number | null
  totalMoneyOfOneTimeTickets: number | null
  totalBoughtTickets: number | null
  totalIssuedTickets: number | null
  totalMultiTimeTickets: number | null
  totalOneTimeTickets: number | null
  totalSoldTickets: number | null
  totalMoney: number | null
  userID: number
  userWallet:  {
    id: number
    walletAdress: string
  }
}

export const UserStatsticData = `
  id
  totalMoneyOfMultiTimeTickets: money_total_ticket_mul
  totalMoneyOfOneTimeTickets: money_total_ticket_ot
  totalBoughtTickets: ticket_bought
  totalIssuedTickets: ticket_issued
  totalMultiTimeTickets: ticket_multi_use
  totalOneTimeTickets: ticket_one_time_use
  totalSoldTickets: ticket_sold
  totalMoney: total_proceeds
  userID: address_id
  userWallet: UserWallet {
    id
    walletAdress: wallet_address
  }
`

export const GET_USER_STATISTIC: DocumentNode = gql`
  query MyQuery($id: Int!) {
    userData: UserNonce(where: {id: {_eq: $id}}) {
      ${UserStatsticData}
    }
  }
`