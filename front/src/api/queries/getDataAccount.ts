import { gql, DocumentNode } from '@apollo/client';

export const GET_DATA_ACCOUNT: DocumentNode = gql`
  query DataAccount($wallet_address: String!){
  UserNonce(where: {UserWallet: {wallet_address: {_eq: $wallet_address}}}) {
    id
    UserWallet {
      wallet_address
    }
  }
}
`