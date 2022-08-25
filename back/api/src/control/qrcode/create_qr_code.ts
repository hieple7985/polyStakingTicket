const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($id: Int!, $qrcode: String!) {
    update_TicketTokens(where: {id: {_eq: $id}}, _set: {qrcode: $qrcode}) {
      affected_rows
      returning {
        approver
        event
        id
        owner_address
        qrcode
        status
        ticket_type
      }
    }
  }
`;
const execute = async (variables: Object) => {
  const fetchResponse = await fetch(variables, update_ticket);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
