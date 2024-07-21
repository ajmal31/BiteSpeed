"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./Config/database");
const helmet_1 = __importDefault(require("helmet"));
const x_xss_protection_1 = __importDefault(require("x-xss-protection"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = require("./Routes/userRoutes");
const app = (0, express_1.default)();
// Database connection
(0, database_1.dbConnection)();
// Middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, x_xss_protection_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use('/api/v1', (0, userRoutes_1.userRoutes)());
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
//# sourceMappingURL=app.js.map