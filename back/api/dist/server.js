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
const express = require("express");
const bodyParser = require("body-parser");
const router_custom = require("./router/index");
var http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
http.createServer(function (req, res) {
    res.writeHead(200, { "Contet-Type": "text/plain" });
    // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.end("helo word");
});
app.get("/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        hello: "world",
    });
}));
router_custom(app);
app.listen(PORT);
//# sourceMappingURL=server.js.map