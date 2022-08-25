import { DocumentNode, gql } from "@apollo/client";

export interface CreateQRCodeInterface {
  ticket_id: number
}

export const CREATE_QRCODE: DocumentNode = gql`
  mutation MyMutation($ticket_id: Int!) {
    createQrCode(ticket_id: $ticket_id) {
      data
    }
  }
`;