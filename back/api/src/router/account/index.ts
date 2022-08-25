var Router = require("router");
var router = Router();
const createWallet = require("../../control/account/create_wallet");
router.post("/user/create", async (req: any, res: any) => {
  const { wallet_address } = req.body.input;
  try {
    const data = await createWallet({ wallet_address });
    console.log(data.data.insert_UserWallet.returning[0].wallet_address);
    return res.json({
      user_id: data.data.insert_UserWallet.returning[0].user_id,
      wallet_address: data.data.insert_UserWallet.returning[0].wallet_address,
    });
  } catch (err) {
    console.log(err);
    res.send("Tài khoản đã tồn tại");
  }
});
module.exports = router;
