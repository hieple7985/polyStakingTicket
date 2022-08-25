const fetch = require("../../fetch/index")
require('dotenv').config()

const create_accounts = `
mutation ($id: Int!, $current_raise: Int!) {
    update_EventCF(where: {id: {_eq: $id}}, _set: {current_raise: $current_raise}) {
      affected_rows
      returning {
        current_raise
        total_raise
      }
    }
  }
`;
// execute the parent operation in Hasura

const execute = async (variables:Object) => {
  const fetchResponse = await fetch(variables,create_accounts) 
  const data = await fetchResponse.json();
  return data
};
module.exports=execute
export{}