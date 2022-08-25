import { gql } from "@apollo/client";

export interface CreateTicketCFT {
  approver: string[]
  catogory_id: number[]
  end_date: string
  end_date_cf: string
  estimate_price: number
  event_info: string
  event_name: string
  event_name_cf: string
  image_event: string
  image_eventcf: string
  image_ticket: string
  location: string
  owner: string
  price_ticket: number
  start_date: string
  start_date_cf: string
  supply: number
  ticket_class: string
  total_raise: number
}

export const CREATE_EVENT_CF = gql`
  mutation CreateEventCF(
    $approver: jsonb!
    $catogory_id: jsonb
    $end_date: timestamp!
    $end_date_cf: timestamp!
    $estimate_price: float8
    $event_info: String
    $event_name: String
    $event_name_cf: String!
    $image_event: String
    $image_eventcf: String
    $image_ticket: String
    $location: String
    $owner: String
    $price_ticket: float8!
    $start_date: timestamp!
    $start_date_cf: timestamp!
    $supply: Int!
    $ticket_class: String!
    $total_raise: Int!
  ){
    createEventcf (
      approver: $approver
      catogory_id: $catogory_id
      end_date: $end_date
      end_date_cf: $end_date_cf
      estimate_price: $estimate_price
      event_info: $event_info
      event_name: $event_name
      event_name_cf: $event_name_cf
      image_event: $image_event
      image_eventcf: $image_eventcf
      image_ticket: $image_ticket
      location: $location
      owner: $owner
      price_ticket: $price_ticket
      start_date: $start_date
      start_date_cf: $start_date_cf
      supply: $supply
      ticket_class: $ticket_class
      total_raise: $total_raise
  ){ 
    affected_rows
  }
}

`;
