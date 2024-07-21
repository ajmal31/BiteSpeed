"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../Config/database");
class Contact extends sequelize_1.Model {
}
const { INTEGER, STRING, DATE, NOW } = sequelize_1.DataTypes;
Contact.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phoneNumber: {
        type: STRING,
        allowNull: true
    },
    email: {
        type: STRING,
        allowNull: true
    },
    linkedId: {
        type: INTEGER,
        allowNull: true,
    },
    linkPrecedence: {
        type: sequelize_1.DataTypes.ENUM("primary", "secondory"),
        allowNull: true
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW
    },
    updatedAt: {
        type: DATE,
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "Contacts",
    timestamps: true,
    paranoid: true,
});
exports.default = Contact;
//# sourceMappingURL=contact.js.map