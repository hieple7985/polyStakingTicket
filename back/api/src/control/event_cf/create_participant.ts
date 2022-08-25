const fetch = require("../../fetch/index")
require('dotenv').config()

const create_accounts = `
mutation ($create_at: timestamp, $event_cf_id: Int, $user_id: Int,$amount:Int!) {
    insert_Participant(objects: {create_at: $create_at, event_cf_id: $event_cf_id, user_id: $user_id,amount:$amount}) {
      affected_rows
      returning {
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