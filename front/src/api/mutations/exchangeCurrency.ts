import { DocumentNode, gql } from "@apollo/client";

export const EXCHANGE_CURRENCY: DocumentNode = gql`
  mutation MyMutation($currency: float8!) {
    exchangeCurrency(currency: $currency) {
      currency
    }
  }
`