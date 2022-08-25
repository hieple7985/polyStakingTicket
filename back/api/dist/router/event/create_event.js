"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("../../fetch/index");
const create_item_catogory = require("../event/create_item_catogory");
require("dotenv").config();
const create_events = `
mutation ($end_date:timestamp!,$image:String!,$owner:String!,$localtion:String!,$name:String!,$start_date:timestamp!,) {
    insert_Event(objects: {end_date: $end_date, image: $image, localtion:$localtion, name: $name, owner: $owner, start_date: $start_date, status: 1}) {
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
const execute = (variables, catogory_id) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, create_events);
    const data = yield fetchResponse.json();
    console.log("test123", data.data.insert_Event.returning[0].id);
    if (data.errors == undefined) {
        for (var i = 0; i < catogory_id.length; i++) {
            console.log("test", catogory_id[i]);
            console.log("test123", catogory_id.length);
            yield create_item_catogory({
                event_id: data.data.insert_Event.returning[0].id,
                catogory_id: catogory_id[i],
            }).then((val) => {
                console.log("test123", val);
            }).catch((err) => console.log(err));
            console.log(i);
        }
    }
    console.log("DEBUG: ", data);
    return data;
});
module.exports = execute;
//# sourceMappingURL=create_event.js.map