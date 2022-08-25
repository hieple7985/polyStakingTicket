import { json } from "node:stream/consumers";

var Router = require("router");
const create_qr = require("../../control/qrcode/create_qr_code")
var router = Router();
var btoas = require('btoa');
const QRCode = require('qrcode');
const get_ticket = require("../../control/qrcode/get_ticket")
interface Respone{
  qrcode:string
}
router.post("/create", async (req: any, res: any) => {
  const {ticket_id}= req.body.input 
  try {
    let img = "";
    const ticket = await get_ticket({id:ticket_id})
    console.log("testticket",ticket.data.TicketTokens[0])
    const output = {
      ticket_id:ticket_id,
      owner_address:ticket.data.TicketTokens[0].owner_address,
      status: ticket.data.TicketTokens[0].status,
      user_create_ticket:ticket.data.TicketTokens[0].Event.owner
    }
    const segs = btoas(JSON.stringify(output));
    let qr = await QRCode.toDataURL(segs);
    let data1 = create_qr({id:ticket_id,qrcode:qr})
    console.log(data1)
    return res.json({
      data:{
        qrcode: qr
      }
    })
  
  } catch (err) {
    console.log(err);
    res.status(400).send("Không thể sinh mã qr");
  }
});
module.exports = router;
