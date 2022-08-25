const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
mutation ($id:Int!,$input:Event_set_input) {
    update_Event(where: {id: {_eq: $id}}, _set: $input) {
      affected_rows
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
