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
var Router = require("router");
const create_qr = require("../../control/qrcode/create_qr_code");
var router = Router();
var btoas = require('btoa');
const QRCode = require('qrcode');
const get_ticket = require("../../control/qrcode/get_ticket");
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticket_id } = req.body.input;
    try {
        let img = "";
        const ticket = yield get_ticket({ id: ticket_id });
        console.log("testticket", ticket.data.TicketTokens[0]);
        const output = {
            ticket_id: ticket_id,
            owner_address: ticket.data.TicketTokens[0].owner_address,
            status: ticket.data.TicketTokens[0].status,
            user_create_ticket: ticket.data.TicketTokens[0].Event.owner
        };
        const segs = btoas(JSON.stringify(output));
        let qr = yield QRCode.toDataURL(segs);
        let data1 = create_qr({ id: ticket_id, qrcode: qr });
        console.log(data1);
        return res.json({
            data: {
                qrcode: qr
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Không thể sinh mã qr");
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map