const fetch = require("../../fetch/index");
require("dotenv").config();

const get_eventcf_now = `
query MyQuery {
    eventcf_now {
      current_raise
      end_date
      end_date_cf
      estimate_price
      event_id
      event_info
      id
      image_event
      image_eventcf
      image_ticket
      location
      start_date
      start_date_cf
      status
      supply
      ticket_class
      ticket_type
      total_raise
    }
  }
  
  
`;

const execute = async (variables: Object) => {
  const fetchResponse = await fetch(variables, get_eventcf_now);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
