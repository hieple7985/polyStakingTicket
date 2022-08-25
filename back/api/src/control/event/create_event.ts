const fetch = require("../../fetch/index");
const create_item_catogory = require("../event/create_item_catogory");
require("dotenv").config();

const create_events = `
mutation ($end_date:timestamp!,$image:String!,$owner:String!,$localtion:String!,$name:String!,$start_date:timestamp!,$ticket_issued:Int,$ticket_sold:Int,$total_proceed:float8,$eventcf:Int) {
    insert_Event(objects: {end_date: $end_date, image: $image, localtion:$localtion, name: $name, owner: $owner, start_date: $start_date, status: 1,ticket_issued:$ticket_issued,ticket_sold:$ticket_sold,total_proceed:$total_proceed,eventcf:$eventcf }) {
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

const execute = async (variables: Object, catogory_id: any) => {
  const fetchResponse = await fetch(variables, create_events);
  const data = await fetchResponse.json();
  console.log("test123",data.data.insert_Event.returning[0].id);
  if (data.errors == undefined) {
    for (var i = 0; i < catogory_id.length; i++) {
      console.log("test",catogory_id[i])
      console.log("test123",catogory_id.length)
      await create_item_catogory({
        event_id: data.data.insert_Event.returning[0].id,
        catogory_id: catogory_id[i],
      }).then((val: any) => {
        console.log("test123", val);
      }).catch((err:any)=>console.log(err));
      console.log(i)
    }
  }
  console.log("DEBUG: ", data);
  return data;
};
module.exports = execute;
export {};
