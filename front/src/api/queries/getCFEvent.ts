import { gql } from "@apollo/client"
import { DocumentNode } from "graphql"



export interface CFEventInterface {
  id: number,
  name: string,
  image: string,
  startDate: string
  endDate: string,
  info: string,
  fundingPrice: number,
  currentRaise: number,
  totalRaise: number,
  owner: string,
  status: number,
  events: [{
    id: number,
    name: string,
    image: string,
    location: string,
    startDate: string,
    endDate: string,
    owner: string,
    status: number,
    eventCategories: [{
      category: {
        id: number
        name: string,
      }
    }]
  }]
  participants: [{
    id: number,
    userID: number,
    amount: number,
    joinDate: string,
  }]
}

export const cfEventData = `
  id
  name: event_name_cf
  image: image_eventcf
  startDate: start_date_cf
  endDate: end_date_cf
  info: event_info
  fundingPrice: estimate_price
  currentRaise: current_raise
  totalRaise: total_raise
  owner
  status
  events: Events {
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
  }
  participants: Participants {
    id
    userID: user_id
    amount
    joinDate: create_at
  }
`

export const GET_CF_EVENTS: DocumentNode = gql`
  query MyQuery {
    cfEvents: EventCF { 
      ${cfEventData}
    }
  }
`

export const GET_CF_EVENTS_BY_STATUS: DocumentNode = gql`
  query MyQuery($status: Int!) {
    cfEvents: EventCF(where: {status: {_eq: $status}}) {
      ${cfEventData}
    }
  }
`

export const GET_UPCOMING_AND_PROGRESSING_CF_EVENTS: DocumentNode = gql`
  query MyQuery {
    cfEvents: EventCF(where: {status: {_in: [1, 2]}}, order_by: {status: desc}) {
      ${cfEventData}
    }
  }
`

export const GET_CF_EVENTS_BY_ID: DocumentNode = gql`
  query MyQuery($id: Int!) {
    cfEvents: EventCF(where: {id: {_eq: $id}}) {
      ${cfEventData}
    }
  }
`

export const GET_CF_EVENTS_BY_OWNER: DocumentNode = gql`
  query MyQuery($owner: String!) {
    cfEvents: EventCF(where: {owner: {_eq: $owner}}) {
      ${cfEventData}
    }
  }
`

export const GET_CF_EVENTS_BY_PARTICIPANT: DocumentNode = gql`
  query MyQuery($userID: Int!) {
    cfEvents: EventCF(where: {Participants: {UserNonce: {id: {_eq: $userID}}}}) {
      ${cfEventData}
    }
  }
`

export const GET_CF_EVENTS_BY_SEARCH_AND_STATUS: DocumentNode = gql`
  query MyQuery($search: String!, $status: Int!) {
    cfEvents: EventCF(where: {status: {_eq: $status}, event_name_cf: {_ilike: $search}}) {
      ${cfEventData}
    }
  }
`

export const GET_CF_EVENTS_BY_SEARCH_AND_OWNER: DocumentNode = gql`
  query MyQuery($search: String!, $owner: String!) {
    cfEvents: EventCF(where: {owner: {_eq: $owner}, event_name_cf: {_ilike: $search}}) {
      ${cfEventData}
    }
  }
`