const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query ($id:Int!) {
    TicketTokens(where: {id: {_eq: $id}}) {
      approver
      event
      id
      owner_address
      price
      qrcode
      status
      ticket_type
      Event {
        status
      }
    }
  }
  
`;
const execute = async (variables: Object) => {
  const fetchResponse = await fetch(variables, get_event_now);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
