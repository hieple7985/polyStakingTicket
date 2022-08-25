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
const createWallet = require("../../control/account/create_wallet");
router.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet_address } = req.body.input;
    try {
        const data = yield createWallet({ wallet_address });
        console.log(data.data.insert_UserWallet.returning[0].wallet_address);
        return res.json({
            user_id: data.data.insert_UserWallet.returning[0].user_id,
            wallet_address: data.data.insert_UserWallet.returning[0].wallet_address,
        });
    }
    catch (err) {
        console.log(err);
        res.send("Tài khoản đã tồn tại");
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map