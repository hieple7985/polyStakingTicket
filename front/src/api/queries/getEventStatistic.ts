import { gql, DocumentNode } from '@apollo/client';

export interface EventStatisticInterface {
  issued: number | null,
  sold: number | null,
  total: number | null,
}

export const GET_EVENT_STATISTIC: DocumentNode = gql`
  query MyQuery($id: Int!) {
    event: Event(where: {id: {_eq: $id}}) {
      issued: ticket_issued
      sold: ticket_sold
      total: total_proceed
    }
  }
`