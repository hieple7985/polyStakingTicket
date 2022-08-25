var Router = require("router");
var router = Router();
const get_currency = require("../../control/rateconvention/get_rate_convention")
router.post("/exchange", async (req:any, res:any) => {
    const {currency} = req.body.input
  try {
    const data = await get_currency()
    console.log(data.data.RateConvention[0].currency)
    console.log(data)
    res.status(200).json({
      currency: currency*data.data.RateConvention[0].currency
    })
  } catch (err) {
    console.log(err);
    res.status(400).send("Không thể đổi được tiền tệ");
  }
});
module.exports = router;