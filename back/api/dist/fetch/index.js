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
const fetch = require("node-fetch");
require('dotenv').config();
const execute = (variables, query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.NODE_FETCH_URL_GRAPQL);
    const fetchResponse = yield fetch(process.env.NODE_FETCH_URL_GRAPQL, {
        method: 'POST',
        body: JSON.stringify({
            query: query,
            variables
        }),
        headers: {
            "x-hasura-admin-secret": process.env.ADMIN_SECRET,
            "x-hasura-role": "admin",
        }
    });
    return fetchResponse;
});
module.exports = execute;
//# sourceMappingURL=index.js.map