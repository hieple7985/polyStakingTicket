const fetch = require("../../fetch/index");
require("dotenv").config();

const update_event = `
mutation ($id: Int!) {
    update_Event(where: {id: {_eq: $id}}, _set: {status: 2}) {
      affected_rows
      returning {
        end_date
        id
        image
        localtion
        name
        owner
        start_date
        status
      }
    }
  }
`;

const execute = async (variables: Object) => {
  const fetchResponse = await fetch(variables, update_event);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
