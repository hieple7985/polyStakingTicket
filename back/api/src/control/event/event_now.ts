const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query MyQuery {
    event_now {
      end_date
      id
      localtion
      name
      owner
      start_date
      status
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
