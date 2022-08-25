import { DocumentNode, gql } from "@apollo/client";

export interface CreateTicketT {
  image: string,
  localtion: string,
  name: string,
  owner: string,
  start_date: string,
  end_date: string,
  catogory_id: number[]
}

export const CREATE_EVENT: DocumentNode = gql`
  mutation CreateEvent(
    $image: String!,
    $localtion: String!,
    $name: String!,
    $owner: String!,
    $start_date: timestamp!,
    $end_date: timestamp!,
    $catogory_id: jsonb
  ){
    createEvent(
      image: $image,
      localtion: $localtion,
      name: $name,
      owner: $owner,
      start_date: $start_date,
      end_date: $end_date,
      catogory_id: $catogory_id
  ){ 
    event
  }
}

`;
