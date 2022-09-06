"use strict";
exports.__esModule = true;
var http_1 = require("http");
var mongodb_1 = require("mongodb");
require("dotenv/config");
var FlightController_js_1 = require("./controller/FlightController.js");
var uri = "mongodb+srv://".concat(process.env["DB_USER"], ":").concat(process.env["DB_PASSWORD"], "@").concat(process.env["DB_URL"], "/FlightDatabase?retryWrites=true&w=majority");
console.log(uri);
var client = new mongodb_1.MongoClient(uri);
try {
    client.connect(function (uri, err) {
        if (err)
            return console.error(err);
        console.log("Connected to database");
        var db = client.db("flights-database");
        var flightsCollection = db.collection("flights");
        var server = (0, http_1.createServer)(function (req, res) {
            var requestString = req.url || '';
            var requestArray = requestString.split("/");
            var flightId = parseInt(requestArray[2]);
            if (requestArray[1] === "flights") {
                if (req.method === "GET") {
                    if (!Number.isNaN(flightId)) {
                        (0, FlightController_js_1.getMethod)(req, res, { "id": requestArray[2] }, flightsCollection);
                    }
                    else {
                        (0, FlightController_js_1.getMethod)(req, res, {}, flightsCollection);
                    }
                }
                else if (req.method === "POST") {
                    (0, FlightController_js_1.postMethod)(req, res, flightsCollection);
                }
                else if (req.method === "PUT") {
                    (0, FlightController_js_1.putMethod)(req, res, flightsCollection);
                }
                else if (req.method === "DELETE") {
                    if (!Number.isNaN(flightId)) {
                        (0, FlightController_js_1.deleteMethod)(req, res, { id: requestArray[2] }, flightsCollection);
                    }
                }
            }
            else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "mensagem": "erro" }));
            }
        });
        var PORT = process.env.PORT;
        server.listen(PORT, function () {
            console.log("Listening to port ".concat(PORT));
        });
    });
}
catch (e) {
    console.error(e);
}
