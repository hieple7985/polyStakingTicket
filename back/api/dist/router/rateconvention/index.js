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
const get_currency = require("../../control/rateconvention/get_rate_convention");
router.post("/exchange", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency } = req.body.input;
    try {
        const data = yield get_currency();
        console.log(data.data.RateConvention[0].currency);
        console.log(data);
        res.status(200).json({
            currency: currency * data.data.RateConvention[0].currency
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Không thể đổi được tiền tệ");
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map