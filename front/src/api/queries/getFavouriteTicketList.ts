import { gql, DocumentNode } from '@apollo/client';
import { ticketData } from './getTickets';

export interface FavouriteTicketListInterface {
  id: number,
  user: number,
  ticketID: number,
  verified: boolean,
  favorited: number,
  ticket: {
    id: number,
    price: number,
    qrcode: string,
    status: number,
    usable: number,
    ticketClass: string,
    ticketType: number,
    ticketOwner: string,
    image: string,
    approvers: string[],
    transactions: [{
      id: number,
    }]
    event: {
      id: number,
      name: string,
      image: string,
      location: string,
      owner: string,
      startDate: string,
      endDate: string,
      status: number,
      eventCategories: [{
        category: {
          id: number
          name: string,
        }
      }]
    }
  }
}

export const favouriteTicketListData = `
  id
  user: owner
  ticketID: tiket_token_id
  verified
  favorited
  ticket: TicketToken {
    ${ticketData}
  }
`

export const GET_FAVOURITE_TICKET_LIST: DocumentNode = gql`
  query MyQuery {
    collection: TicketCollection {
      ${favouriteTicketListData}
    }
  } 
`

export const GET_FAVOURITE_TICKET_LIST_BY_USER: DocumentNode = gql`
  query MyQuery($userID: Int!, $userName: String!) {
    collection: TicketCollection(where: {owner: {_eq: $userID}, TicketToken: {Event: {owner: {_neq: $userName}}}}) {
      ${favouriteTicketListData}
    }
  }
`