const fetch = require("../../fetch/index");
require("dotenv").config();

const get_rate_conventtion = `
query MyQuery {
  RateConvention {
    currency
    date_update
    id
  }
}
  
`;
const execute = async (variables) => {
  const fetchResponse = await fetch(variables,get_rate_conventtion);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
