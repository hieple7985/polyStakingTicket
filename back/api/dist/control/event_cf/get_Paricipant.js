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
const get_eventcf = `
query ($event_cf_id:Int!) {
    Participant(where: {event_cf_id: {_eq: $event_cf_id}}) {
      user_id
      id
      event_cf_id
      create_at
      amount
      UserNonce {
        id
        total_proceeds
        ticket_sold
        ticket_bought
        ticket_issued
        UserWallet {
          wallet_address
        }
      }
    }
  }
  
`;
const execute = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, get_eventcf);
    const data = yield fetchResponse.json();
    return data;
});
module.exports = execute;
//# sourceMappingURL=get_Paricipant.js.map