import { gql } from "@apollo/client"
import { DocumentNode } from "graphql"



export interface CategoryInterface {
  id: number,
  name: string,
  type: string,
}

export const GET_CATEGORIES: DocumentNode = gql`
  query MyQuery {
    categories: EventCatogory {
      id
      name
      type
    }
  }
`
