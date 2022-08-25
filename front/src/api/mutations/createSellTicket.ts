import { DocumentNode, gql } from '@apollo/client'

export const CREATE_SELL_TICKET: DocumentNode = gql`
  mutation MyMutation($id: Int!, $price: float8!) {
    createSellTicket(id: $id, price: $price) {
      data
    }
  }
`