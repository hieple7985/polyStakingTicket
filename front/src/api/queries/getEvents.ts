import { gql } from "@apollo/client"
import { DocumentNode } from "graphql"

export interface EventCategoryInterface {
  category: {
    id: number,
    name: string,
  }
}

export interface EventInterface {
  id: number,
  name: string,
  image: string,
  location: string,
  startDate: string,
  endDate: string,
  owner: string,
  status: number,
  ticketToken: [{
    id: number,
    price: number,
    qrcode: string,
    status: string,
    approvers: string[],
    owner: string,
    ticketType: number,
  }]
  eventCategories: [{
    category: {
      id: number
      name: string,
    }
  }]
}

export const eventData = `
  id
  name
  image
  location: localtion
  startDate: start_date 
  endDate: end_date
  owner
  status
  issuedTickets: ticket_issued
  soldTickets: ticket_sold
  totalMoney: total_proceed
  ticketToken: TicketTokens {
    id
    price
    qrcode
    status
    approvers: approver
    owner: owner_address
    ticketType: ticket_type
  }
  eventCategories: EventCatogoryItems {
    category: EventCatogory {
      id
      name
    }
  }
`

export const eventDataWOTicket = `
  id
  name
  image
  location: localtion
  startDate: start_date 
  endDate: end_date
  owner
  status
  issuedTickets: ticket_issued
  soldTickets: ticket_sold
  totalMoney: total_proceed
  eventCategories: EventCatogoryItems {
    category: EventCatogory {
      id
      name
    }
  }
`

export const GET_AVAILABLE_EVENTS: DocumentNode = gql`
  query MyQuery {
    events: Event(where: {status: {_eq: 1}}) {
      ${eventData}
    }
  }
`

export const GET_AVAILABLE_EVENTS_BY_CATE: DocumentNode = gql`
  query MyQuery($id: Int!) {
    events: Event(where: {EventCatogoryItems: {catogory_id: {_eq: $id}}, status: {_eq: 1}}) {
      ${eventData}
    }
  }
`

export const GET_NEWEST_EVENTS:  DocumentNode = gql`
  query MyQuery {
    events: Event(order_by: {start_date: desc}, limit: 20, where: {status: {_eq: 1}}) {
      ${eventData}
    }
  }
`

export const GET_EXPIRING_EVENTS:  DocumentNode = gql`
  query MyQuery {
    events: Event(order_by: {start_date: asc}, limit: 20, where: {status: {_eq: 1}}) {
      ${eventData}
    }
  }
`
export const GET_EVENT_BY_ID: DocumentNode = gql`
  query MyQuery($id: Int!) {
    events: Event(where: {id: {_eq: $id}}) {
      ${eventData}
    }
  }
`

export const GET_EVENTS_BY_SEARCH: DocumentNode = gql`
  query MyQuery($search: String!) {
    events: Event(where: {name: {_ilike: $search}}) {
      ${eventData}
    }
  }
`

export const GET_EVENTS_BY_SEARCH_AND_CATE: DocumentNode = gql`
  query MyQuery($search: String!, $categoryID: Int!) {
    events: Event(where: {name: {_ilike: $search}, EventCatogoryItems: {catogory_id: {_eq: $categoryID}}}) {
      ${eventData}
    }
  }
`

export const GET_EVENTS_BY_USER: DocumentNode = gql`
  query MyQuery($userName: String!) {
    events: Event(where: {owner: {_eq: $userName}}) {
      ${eventData}
    }
  }
`

export const GET_AVAILABLE_EVENTS_BY_USER = gql`
  query getEventsUser($userName: String!) {
    events: Event(where: {owner: {_eq: $userName}, status: {_eq: 1}}) {
      ${eventData}
    }
  }
`;

export const GET_EVENT_BY_ID_AND_OWNER: DocumentNode = gql`
  query MyQuery($userName: String!, $eventID: Int!) {
    events: Event(where: {owner: {_eq: $userName}, id: {_eq: $eventID}}) {
      ${eventData}
    }
  }
`