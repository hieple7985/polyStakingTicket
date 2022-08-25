var Router = require("router");
var router = Router();
const get_account_id = require("../../control/account/get_account_id");
const get_ticket_id = require("../../control/statistic/get_ticket_id");
const statistic = require("../../control/account/update_account");
const get_event = require("../../control/statistic/get_event");
const update_event = require("../../control/event/update_event")
router.post("/sold", async (req: any, res: any) => {
  const data = req.body.event.data.new;
  console.log("test", data);
  try {
    console.log("test");
    const account = await get_account_id({ id: data.user_id });
    console.log("test1", account);
    const ticket = await get_ticket_id({ id: data.ticket_id });
    console.log("test2", ticket);
    const event = await get_event({ id: ticket.data.TicketTokens[0].event });
    
    console.log(event.data.Event[0]);
    if (data.type == 1 && data.status == 2) {
      let ticket_one_time_use = account.data.UserNonce[0].ticket_one_time_use;
      let ticket_multi_use:number  = account.data.UserNonce[0].ticket_multi_use;
      let money_total_ticket_ot:number  =
        account.data.UserNonce[0].money_total_ticket_ot;
      let money_total_ticket_mul:number  =
        account.data.UserNonce[0].money_total_ticket_mul;
      let ticket_sold_event:number  =
        event.data.Event[0].ticket_sold == null
          ? 0 + 1
          : event.data.Event[0].ticket_sold + 1;
      let total_proceed:number  =
        event.data.Event[0].total_proceed == null
          ? ticket.data.TicketTokens[0].price
          : event.data.Event[0].total_proceed +
            ticket.data.TicketTokens[0].price;
      let data_update_event = await update_event({id: ticket.data.TicketTokens[0].event ,input:{
        ticket_sold:ticket_sold_event,
        total_proceed
      }})
      console.log(data_update_event)
      if (ticket.data.TicketTokens[0].ticket_type == 1) {
        ticket_one_time_use =
          ticket_one_time_use == null ? 0 + 1 : ticket_one_time_use + 1;
        money_total_ticket_ot =
          money_total_ticket_ot == null
            ? 0 + ticket.data.TicketTokens[0].price
            : money_total_ticket_ot + ticket.data.TicketTokens[0].price;
      } else {
        ticket_multi_use =
          ticket_multi_use == null ? 0 + 1 : ticket_multi_use + 1;
        console.log(ticket_multi_use);
        money_total_ticket_mul =
          money_total_ticket_mul == null
            ? 0 + ticket.data.TicketTokens[0].price
            : money_total_ticket_mul + ticket.data.TicketTokens[0].price;
      }
      const ticket_sold:number = account.data.UserNonce[0].ticket_sold + 1;
      console.log(ticket_sold);
      const update = await statistic({
        id: data.user_id,
        input: {
          ticket_one_time_use,
          ticket_multi_use,
          money_total_ticket_ot,
          money_total_ticket_mul,
          ticket_sold,
          total_proceeds: money_total_ticket_ot + money_total_ticket_mul,
        },
      });
      console.log(update);
    }
    return res.status(200).send("test");
  } catch (err) {
    return res.status(400).send("lỗi");
  }
});
module.exports = router;
