const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
query ($id:Int!) {
    TicketTokens(where: {id: {_eq: $id}}) {
      approver
      event
      id
      image_link
      owner_address
      price
      qrcode
      status
      ticket_type
      Event {
        owner
        end_date
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
