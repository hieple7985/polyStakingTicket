const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query get_account {
    UserNonce {
      address_id
      id
      ticket_bought
      ticket_issued
      ticket_sold
      }
  }
`;
const execute = async (variables: any) => {
    const fetchResponse = await fetch(variables, get_event_now);
    const data = await fetchResponse.json();
    return data;
  };
  module.exports = execute;
export {};
