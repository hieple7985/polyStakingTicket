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
require('dotenv').config();
const create_eventcf = `
mutation ($price_ticket:float8!,$event_name_cf:String!,$approver: jsonb!, $catogory_id: jsonb,$end_date: timestamp!, $end_date_cf: timestamp!, $estimate_price: float8, $event_info: String, $event_name: String, $image_event: String, $image_eventcf: String, $image_ticket: String, $location: String, $owner: String, $start_date: timestamp!, $start_date_cf: timestamp!, $supply: Int!, $total_raise: Int!, $ticket_class: String!) {
    insert_EventCF(objects: {price_ticket:$price_ticket,event_name_cf:$event_name_cf,approver: $approver, catogory_id: $catogory_id, current_raise: 0, end_date: $end_date, end_date_cf: $end_date_cf, estimate_price: $estimate_price, event_info: $event_info, event_name: $event_name, image_event: $image_event, image_eventcf: $image_eventcf, image_ticket: $image_ticket, location: $location, owner: $owner, start_date: $start_date, start_date_cf: $start_date_cf, status: 1, supply: $supply, ticket_class: $ticket_class, ticket_type: 1, total_raise: $total_raise}) {
      affected_rows
      returning {
        approver
        catogory_id
        current_raise
        end_date
        end_date_cf
        estimate_price
        event_info
        event_name
        id
        image_event
        image_eventcf
        image_ticket
        location
        owner
        start_date
        start_date_cf
        status
        supply
        ticket_class
        ticket_type
        total_raise
      }
    }
  }
`;
// execute the parent operation in Hasura
const execute = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, create_eventcf);
    const data = yield fetchResponse.json();
    return data;
});
module.exports = execute;
//# sourceMappingURL=create_eventcf.js.map