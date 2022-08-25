const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($create_at:timestamptz,$ticket_id:Int!,$user_id:Int!,$owner_address:String!) {
    insert_Transaction(objects: {create_at:$create_at, ticket_id: $ticket_id, type: 3, user_id:$user_id,status:1}) {
      affected_rows
    }
    update_TicketTokens(where: {id: {_eq:$ticket_id}}, _set: {owner_address: $owner_address}) {
      affected_rows
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
