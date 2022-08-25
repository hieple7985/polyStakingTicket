import { DocumentNode, gql } from "@apollo/client"
import { eventDataWOTicket } from "./getEvents"

export interface TicketInterface {
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

export const ticketData = `
  id
  price
  qrcode
  status
  usable
  ticketClass: class_ticket
  ticketType: ticket_type
  ticketOwner: owner_address
  image: image_link
  approvers: approver
  transactions: Transactions {
    id
  }
  event: Event {
    ${eventDataWOTicket}
  }
  
`

export const GET_TICKETS_BY_EVENT: DocumentNode = gql`
  query MyQuery($eventID: Int!) {
    tickets: TicketTokens(where: {Event: {id: {_eq: $eventID}}}) {
      ${ticketData}
    }
  }
`

export const GET_SOLD_TICKETS_BY_EVENT: DocumentNode = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_neq: $ownerName}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID}}}) {
      ${ticketData}
    }
  }
`

export const GET_REMAINING_TICKETS_BY_EVENT: DocumentNode = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID}}}) {
      ${ticketData}
    }
  }
`

export const GET_AVAILABLE_TICKETS_BY_EVENT: DocumentNode = gql`
  query MyQuery($eventID: Int!) {
    tickets: TicketTokens(where: {status: {_eq: 1}, Event: {id: {_eq: $eventID}}}) {
      ${ticketData}
    }
  }
`

export const GET_TICKET_BY_ID: DocumentNode = gql`
  query MyQuery($id: Int!) {
    tickets: TicketTokens(where: {id: {_eq: $id}}) {
      ${ticketData}
    }
  }
`

export const GET_BOUGHT_TICKETS_BY_OWNER: DocumentNode = gql`
  query MyQuery($ownerName: String!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_neq: $ownerName}}}) {
      ${ticketData}
    }
  }
`

export const GET_BOUGHT_TICKET_BY_ID_AND_OWNER: DocumentNode = gql`
  query MyQuery($ownerName: String!, $ticketID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_neq: $ownerName}}, id: {_eq: $ticketID}}) {
      ${ticketData}
    }
  }
`

export const GET_ISSUED_TICKETS: DocumentNode = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID} }}) {
      ${ticketData}
    }
  }
`