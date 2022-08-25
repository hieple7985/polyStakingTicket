const fetch = require("../../fetch/index")
require('dotenv').config()

const create_accounts = `
mutation ($address_id: Int!) {
    insert_UserNonce(objects: {address_id: $address_id}) {
      affected_rows
      returning {
        address_id
        id
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