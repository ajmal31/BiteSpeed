"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false, // Set to true if you want to see SQL queries in the console
});
exports.default = exports.sequelize;
const dbConnection = async () => {
    try {
        await exports.sequelize.authenticate();
        await exports.sequelize.sync();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=database.js.map