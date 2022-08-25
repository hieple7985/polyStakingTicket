const fetch = require("../../fetch/index")
require('dotenv').config()

const create_accounts = `
mutation ($id: Int!, $amount: Int!) {
    update_Participant(where: {id: {_eq: $id}}, _set: {amount: $amount}) {
      affected_rows
      returning {
        amount
        create_at
        event_cf_id
        id
        user_id
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