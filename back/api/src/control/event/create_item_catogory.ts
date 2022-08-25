const fetch = require("../../fetch/index")
require('dotenv').config()

const create_catogory_items = `
mutation ($catogory_id:Int!,$event_id:Int!) {
    insert_EventCatogoryItem(objects: {catogory_id: $catogory_id, event_id: $event_id}) {
      affected_rows
      returning {
        catogory_id
        event_id
        id
      }
    }
  }
`;

const execute = async (variables:Object) => {
  const fetchResponse = await fetch(variables,create_catogory_items) 
  const data = await fetchResponse.json();
  return data
};
module.exports=execute
export{}