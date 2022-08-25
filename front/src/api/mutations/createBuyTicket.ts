import { DocumentNode, gql } from '@apollo/client'

export const CREATE_BUY_TICKET: DocumentNode = gql`
  mutation MyMutation($transactionID: Int!, $ticketID: Int!, $createAt: timestamptz,  $ownerAddress: String!, $userID: Int!) {
  createBuyTicket(owner_address: $ownerAddress, ticket_id: $ticketID, user_id: $userID, create_at: $createAt, id_transaction: $transactionID) {
    data
  }
}
`