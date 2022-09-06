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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteMethod = exports.putMethod = exports.postMethod = exports.getMethod = void 0;
//import { getAllFlights, getFlightById, postFlight, updateFlight, deleteFlight } from '../model/FlightModel.js'
var ReadBodyData_js_1 = require("../utils/ReadBodyData.js");
function getMethod(req, res, query, flightsCollection) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, flightsCollection.find(query).toArray(function (err, result) {
                            if (err)
                                throw err;
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify(result));
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
                    res.end("<h1> ".concat(err_1, " </h1>"));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMethod = getMethod;
//Deprecated
/*export async function getById(id, req, res, flightsCollection)
{
        try {
                const flightById = await getFlightById(id);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(flightById));

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}



export async function getAll(req, res, flightsCollection)
{
        const allFlights = await getAllFlights();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(allFlights));

}*/
function postMethod(req, res, flightsCollection) {
    return __awaiter(this, void 0, void 0, function () {
        var stringFlight, _a, id, name, callsign, country, active, jsonFlight, success, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, ReadBodyData_js_1.readBodyData)(req, res)];
                case 1:
                    stringFlight = _b.sent();
                    _a = JSON.parse(stringFlight), id = _a.id, name = _a.name, callsign = _a.callsign, country = _a.country, active = _a.active;
                    jsonFlight = { id: id, name: name, callsign: callsign, country: country, active: active };
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, flightsCollection.insertOne(jsonFlight)];
                case 3:
                    success = _b.sent();
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(success));
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _b.sent();
                    console.log(err_2);
                    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
                    res.end("<h1> ".concat(err_2, " </h1>"));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.postMethod = postMethod;
function putMethod(req, res, flightsCollection) {
    return __awaiter(this, void 0, void 0, function () {
        var stringFlight, jsonFlight, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, ReadBodyData_js_1.readBodyData)(req, res)];
                case 1:
                    stringFlight = _a.sent();
                    jsonFlight = JSON.parse(stringFlight);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, flightsCollection.updateOne({ id: jsonFlight.id }, { $set: jsonFlight })];
                case 3:
                    result = _a.sent();
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(result));
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    console.log(err_3);
                    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
                    res.end("<h1> ".concat(err_3, " </h1>"));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.putMethod = putMethod;
function deleteMethod(req, res, query, flightsCollection) {
    return __awaiter(this, void 0, void 0, function () {
        var success, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(query);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, flightsCollection.deleteOne(query)];
                case 2:
                    success = _a.sent();
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(success));
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.log(err_4);
                    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
                    res.end("<h1> ".concat(err_4, " </h1>"));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMethod = deleteMethod;
