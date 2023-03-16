"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
(0, app_1.default)(app);
(0, db_1.default)();
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "api is available for consumption testing ",
    });
});
app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});
