import { DocumentNode, gql } from "@apollo/client"

export const JOIN_CF: DocumentNode = gql`
  mutation MyMutation($amount: Int!, $cfEventID: Int!, $userWallet: String!) {
    JoinCF(input: {amount: $amount, eventcf_id: $cfEventID, wallet_address: $userWallet}) {
      data
    }
  }
`