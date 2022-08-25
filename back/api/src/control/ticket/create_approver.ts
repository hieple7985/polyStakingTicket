const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($token:Int!,$user_id:Int!,$expires_at:timestamp!) {
    insert_UserAccessToken(objects: {token: $token, user_id: $user_id,expires_at:$expires_at}) {
      affected_rows
      returning {
        token
        user_id
      }
    }
  }
`;
const execute = async (variables: Object) => {
  const fetchResponse = await fetch(variables, update_ticket);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
