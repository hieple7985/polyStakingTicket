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
const get_account_bought = require("../../control/account/get_account_id");
const get_ticket_bought = require("../../control/statistic/get_ticket_id");
const update = require("../../control/account/update_account");
router.post("/bought", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    console.log(data);
    try {
        if (data.type == 2) {
            const account = yield get_account_bought({ id: data.user_id });
            const ticket_bought = account.data.UserNonce[0].ticket_bought + 1;
            console.log(ticket_bought);
            const update_data = yield update({
                id: data.user_id,
                input: {
                    ticket_bought,
                }
            });
            console.log(update_data);
        }
        console.log("mua");
        return res.status(200).send("test");
    }
    catch (err) {
        return res.status(400).send("lỗi");
    }
}));
module.exports = router;
//# sourceMappingURL=statistic_bought.js.map