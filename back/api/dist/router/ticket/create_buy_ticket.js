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
require("dotenv").config();
const update_ticket = `
mutation ($create_at:timestamptz,$ticket_id:Int!,$user_id:Int!,$owner_address:String!,$id_transaction:Int! ) {
    insert_Transaction(objects: {create_at:$create_at, ticket_id: $ticket_id, type: 2, user_id:$user_id,status:1}) {
      affected_rows
    }
    update_TicketTokens(where: {id: {_eq:$ticket_id}}, _set: {owner_address: $owner_address}) {
      affected_rows
    }
    update_Transaction(where: {id: {_eq: $id_transaction}}, _set: {status: 2}) {
      affected_rows
      returning {
        create_at
        id
        status
        ticket_id
        type
        user_id
      }
    }
  }
`;
const execute = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, update_ticket);
    const data = yield fetchResponse.json();
    return data;
});
module.exports = execute;
//# sourceMappingURL=create_buy_ticket.js.map