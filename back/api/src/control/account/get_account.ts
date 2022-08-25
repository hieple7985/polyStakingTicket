const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query get_account($wallet_address:[String!]) {
    UserNonce(where: {UserWallet: {wallet_address: {_in: $wallet_address}}}) {
      address_id
      id
      ticket_bought
      ticket_issued
      ticket_sold
      }
  }
`;
const execute = async (variables: any) => {
console.log("test",variables)
const input= {
    wallet_address:variables
}
  const fetchResponse = await fetch(input, get_event_now);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
