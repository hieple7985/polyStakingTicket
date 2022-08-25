const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query ($id:Int!) {
    Event(where: {id: {_eq: $id}}) {
      ticket_issued
      ticket_sold
      total_proceed
      status
      end_date
      id
      image
      localtion
      name
      owner
      start_date
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
