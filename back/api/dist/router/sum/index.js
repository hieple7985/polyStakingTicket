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
var Router = require("router");
var router = Router();
const sum_ticket_event = require("./sum_ticket_event");
router.post("/event", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketsold = yield sum_ticket_event({
            event_id: 16,
            user_id: 3,
            type: 1,
            status: 2
        });
        const ticketbuy = yield sum_ticket_event({
            event_id: 4,
            user_id: 3,
            type: 2,
            status: 1
        });
        console.log(ticketsold.data.Transaction_aggregate.aggregate.count);
        return res.status(200).json({
            ticketsold: ticketsold.data.Transaction_aggregate.aggregate.count,
            ticketbuy: ticketbuy.data.Transaction_aggregate.aggregate.count,
        });
    }
    catch (err) {
        console.log(err);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map