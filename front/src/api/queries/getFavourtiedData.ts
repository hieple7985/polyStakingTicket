import { gql, DocumentNode } from '@apollo/client';

export interface FavouritedDataInterface {
  id: number,
  user: number,
  ticketID: number,
  verified: boolean,
  favorited: number,
}

export const GET_FAVOURITED_DATA_BY_TICKET_AND_USER: DocumentNode = gql`
  query MyQuery($userID: Int!, $ticketID: Int = 10) {
    collection: TicketCollection(where: {tiket_token_id: {_eq: $ticketID}, owner: {_eq: $userID}}) {
      id
      user: owner
      ticketID: tiket_token_id
      verified
      favorited
    }
  }
`