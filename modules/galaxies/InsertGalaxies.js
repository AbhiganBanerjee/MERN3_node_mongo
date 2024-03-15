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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
//import the express module for building REST services
var express = require("express");
//import the fs module
var fs = require("fs");
//import the mongodb module
var mongodb = require("mongodb");
//import the dotenv for environment variable
var dotenv = require("dotenv");
//import the multer module for handling upload images
var multer = require("multer");
//read the environment variable
dotenv.config();
var url = process.env.MONGO_URI;
//Build this module as a sub-module
var insertGalaxies = express.Router();
//Build the Multer storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
//Give this storage to the multer so that it can create the middleware
var upload = multer({ storage: storage });
//Create a POST request to insert the Galaxy Image as well as other info to MongoDB database
insertGalaxies.post("/", upload.single("image"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clientObj, db, imageData, base64Data, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientObj = new mongodb.MongoClient(url);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                db = clientObj.db("mern_project3");
                imageData = fs.readFileSync(req.file.path);
                base64Data = Buffer.from(imageData).toString('base64');
                return [4 /*yield*/, db.collection("galaxies").insertOne({
                        "id": req.body.id,
                        "name": req.body.name,
                        "type": req.body.type,
                        "distance": req.body.distance,
                        "image": base64Data
                    })];
            case 2:
                result = _a.sent();
                //validate the result, based on insertedId if defined or not
                if (result.insertedId) {
                    res.status(200).json(result);
                }
                else {
                    res.status(400).json({ "Error": "Insertion Failure!!" });
                }
                return [3 /*break*/, 5];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500).json({ "Error": "Error in Connection, try again later!!" });
                return [3 /*break*/, 5];
            case 4:
                clientObj.close();
                res.end();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
//export the module
exports.default = insertGalaxies;
