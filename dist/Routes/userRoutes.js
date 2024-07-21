"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../Controllers/user");
const userRoutes = () => {
    const router = express_1.default.Router();
    router.route('/identify')
        .post(user_1.identifyContact);
    return router;
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=userRoutes.js.map