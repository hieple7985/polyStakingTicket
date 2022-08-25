const fetch = require("../../fetch/index");
require("dotenv").config();

const get_eventcf = `
query ($event_cf_id:Int!) {
    Participant(where: {event_cf_id: {_eq: $event_cf_id}}) {
      user_id
      id
      event_cf_id
      create_at
      amount
      UserNonce {
        id
        total_proceeds
        ticket_sold
        ticket_bought
        ticket_issued
        UserWallet {
          wallet_address
        }
      }
    }
  }
  
`;
const execute = async (variables: any) => {
  const fetchResponse = await fetch(variables, get_eventcf);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
