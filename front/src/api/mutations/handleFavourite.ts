import { DocumentNode, gql } from "@apollo/client"

export const ADD_FAVOURITE: DocumentNode = gql`
  mutation MyMutation($userID: Int!, $ticketID: Int!) {
    insert_TicketCollection(objects: {favorited: 1, owner: $userID, tiket_token_id: $ticketID, verified: false}) {
      affected_rows
    }
  }
`

export const REMOVE_FAVOURITE: DocumentNode = gql`
  mutation MyMutation($userID: Int!, $ticketID: Int!) {
    delete_TicketCollection(where: {owner: {_eq: $userID}, tiket_token_id: {_eq: $ticketID}}) {
      affected_rows
    }
  }
`