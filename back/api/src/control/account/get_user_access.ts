const fetch = require("../../fetch/index");
require("dotenv").config();

const get_event_now = `
query ($user_id:Int!,$token:Int!) {
    UserAccessToken(where: {user_id: {_eq: $user_id}, token: {_eq: $token}}) {
      expires_at
      id
      token
      user_id
    }
  }
`;
const execute = async (variables: any) => {
  const fetchResponse = await fetch(variables, get_event_now);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
