var Router = require("router");
var router = Router();
const get_account_bought = require("../../control/account/get_account_id");
const get_ticket_bought = require("../../control/statistic/get_ticket_id");
const update = require("../../control/account/update_account");
router.post("/bought", async (req: any, res: any) => {
  const data = req.body.event.data.new;
  console.log(data);
  try {
    if (data.type == 2) {
      const account = await get_account_bought({ id: data.user_id });
      const ticket_bought = account.data.UserNonce[0].ticket_bought + 1;
      console.log(ticket_bought);
      const update_data = await update({
        id: data.user_id ,
        input: {
          ticket_bought,
        }
      });
      console.log(update_data);
    }
    console.log("mua");
    return res.status(200).send("test");
  } catch (err) {
    return res.status(400).send("lỗi");
  }
});
module.exports = router;
