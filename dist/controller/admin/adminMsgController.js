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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminModel_1 = __importDefault(require("../../model/admin/adminModel"));
const adminMsg_1 = __importDefault(require("../../model/admin/dashBoard/adminMsg"));
const clientModel_1 = __importDefault(require("../../model/client/clientModel"));
//create or send a message
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { sender, date, desc } = req.body;
        //getting the time and date
        const getDate = new Date().toDateString();
        //getting the user details
        const getUser = yield clientModel_1.default.findById(req.params.userId);
        //getting admin details
        const getAdmin = yield adminModel_1.default.findById(req.params.adminId);
        if (getUser && getAdmin) {
            const newMsg = yield adminMsg_1.default.create({
                sender: getAdmin === null || getAdmin === void 0 ? void 0 : getAdmin.name,
                date: getDate,
                desc,
            });
            yield ((_a = getAdmin === null || getAdmin === void 0 ? void 0 : getAdmin.message) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(newMsg === null || newMsg === void 0 ? void 0 : newMsg._id)));
            getAdmin === null || getAdmin === void 0 ? void 0 : getAdmin.save();
            yield clientModel_1.default.findByIdAndUpdate(getUser === null || getUser === void 0 ? void 0 : getUser._id, {
                $push: { notification: newMsg._id },
            });
            return res.status(201).json({
                message: "message successfully sent",
                data: newMsg,
            });
        }
        else {
            return res.status(404).json({
                message: "User or admin not found",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "bad request , unable to send message",
            data: error,
        });
    }
});
exports.sendMessage = sendMessage;
