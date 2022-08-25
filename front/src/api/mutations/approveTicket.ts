import { DocumentNode, gql } from '@apollo/client'

export interface ApproveDataInterface {
  approveTicket: {
    data: {
      mes: number,
    }
  }
}

export const APPROVE_TICKET: DocumentNode = gql`
  mutation MyMutation($tokenID: Int!, $userID: Int!) {
    approveTicket(token: $tokenID, user_id: $userID) {
      data
    }
  }
`