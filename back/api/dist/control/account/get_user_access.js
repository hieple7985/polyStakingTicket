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
const execute = (variables) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResponse = yield fetch(variables, get_event_now);
    const data = yield fetchResponse.json();
    return data;
});
module.exports = execute;
//# sourceMappingURL=get_user_access.js.map