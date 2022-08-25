function route(app) {
  app.use("/statistic", require("./statistic/statistic_bought"));
  app.use("/statistic", require("./statistic/statistic_sold"));
  app.use("/", require("./upload/index"));
  app.use("/", require("./account/index"));
  app.use("/qr", require("./qrcode/index"));
  app.use("/event", require("./event/index"));
  app.use("/ticket", require("./ticket/index"));
  app.use("/currency", require("./rateconvention/index"));
  app.use("/eventcf", require("./event_cf/index"))
}
module.exports = route;
