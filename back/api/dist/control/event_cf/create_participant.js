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
const create_accounts = `
mutation ($create_at: timestamp, $event_cf_id: Int, $user_id: Int,$amount:Int!) {
    insert_Participant(objects: {create_at: $create_at, event_cf_id: $event_cf_id, user_id: $user_id,amount:$amount}) {
      affected_rows
      returning {
        create_at
        event_cf_id
        id
        user_id
      }
    }
  }
  
`;
// execute the parent operation in Hasura
const execute = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, create_accounts);
    const data = yield fetchResponse.json();
    return data;
});
module.exports = execute;
//# sourceMappingURL=create_participant.js.map