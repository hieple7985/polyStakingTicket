const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($id: Int!,$price:float8!) {
    update_TicketTokens(where: {id: {_eq: $id}}, _set: {status: 1,price:$price}) {
      affected_rows
      returning {
        event
        id
        owner_address
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
