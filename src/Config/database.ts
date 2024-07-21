import { Sequelize } from "sequelize";
import env from "./env";

export const sequelize = new Sequelize(env.DATABASE_URL, {

    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false, // Set to true if you want to see SQL queries in the console
})
export default sequelize

export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}


