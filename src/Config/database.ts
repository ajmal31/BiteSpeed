import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("users", process.env.DB_USERNAME, process.env.DB_PASSWORD, {

    host: "localhost",
    dialect: 'postgres'
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


