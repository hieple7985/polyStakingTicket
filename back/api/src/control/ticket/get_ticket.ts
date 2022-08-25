const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query ($event:Int!) {
    TicketTokens(where: {event: {_eq: $event}}) {
      event
      id
      owner_address
      status
      ticket_type
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
