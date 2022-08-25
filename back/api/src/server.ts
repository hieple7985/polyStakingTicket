const express = require("express");
const bodyParser = require("body-parser");
const router_custom = require("./router/index")
var http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
http.createServer(function (req:any, res:any) {
  res.writeHead(200, { "Contet-Type": "text/plain" });

  // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  res.end("helo word");
});
app.get("/hello", async (req: any, res: any) => {
  return res.json({
    hello: "world",
  });
});
router_custom(app)
app.listen(PORT);
