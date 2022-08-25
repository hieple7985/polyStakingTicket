import { DocumentNode, gql } from "@apollo/client";

export interface CreateExchangeT {
  owner_address: string
  ticket_id: number
  create_at: string
}

export const CREATE_EXCHANGE: DocumentNode = gql`
    mutation CreateExchange(
      $owner_address: String!
      $ticket_id: Int!       
      $create_at: timestamptz!
      ){
      createExchange(
        create_at: $create_at,
        ticket_id: $ticket_id,
        owner_address: $owner_address,
      ){
      data
    }
}
`;
