const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($input: [Transaction_insert_input!]!) {
  insert_Transaction(objects: $input) {
    affected_rows
    returning {
      create_at
      id
      ticket_id
      type
      user_id
      TicketToken {
        event
        owner_address
        ticket_type
        id
        image_link
      }
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
