const fetch = require("node-fetch");
require('dotenv').config()
const execute = async (variables:Object,query:any) => {
  console.log(process.env.NODE_FETCH_URL_GRAPQL)
    const fetchResponse = await fetch(
      process.env.NODE_FETCH_URL_GRAPQL,
      {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          variables
        }),
        headers:{
          "x-hasura-admin-secret": process.env.ADMIN_SECRET,
          "x-hasura-role": "admin",
        
        }
      }
    );
    return fetchResponse;
  };
module.exports=execute
export{}