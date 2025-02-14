import express, { Express } from "express";
import { dbConnection } from "./Config/database";
import helmet from "helmet";
import xXssProtection from "x-xss-protection";
import morgan from "morgan";
import { userRoutes } from "./Routes/userRoutes";
import env from "./Config/env";
import { baseRoutes } from "./Routes/baseRoute";

const app: Express = express();

// Database connection
dbConnection();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(xXssProtection());
app.use(morgan("dev"));

// Routes
app.use('/api/v1', userRoutes());
app.use('/',baseRoutes())

// Start server
const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
