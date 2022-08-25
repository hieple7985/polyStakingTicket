const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($create_at:timestamptz,$ticket_id:Int!,$user_id:Int!,$owner_address:String!,$id_transaction:Int! ) {
    insert_Transaction(objects: {create_at:$create_at, ticket_id: $ticket_id, type: 2, user_id:$user_id,status:2}) {
      affected_rows
    }
    update_TicketTokens(where: {id: {_eq:$ticket_id}}, _set: {owner_address: $owner_address,status:2}) {
      affected_rows
    }
    update_Transaction(where: {id: {_eq: $id_transaction}}, _set: {status: 2}) {
      affected_rows
      returning {
        create_at
        id
        status
        ticket_id
        type
        user_id
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
