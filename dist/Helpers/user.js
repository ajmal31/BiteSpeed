"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSecondoryContact = exports.findSecondoryContacts = exports.createNewContact = exports.findPrimaryContact = void 0;
const contact_1 = __importDefault(require("../Model/contact"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const findPrimaryContact = async (key, value) => {
    try {
        const response = await contact_1.default.findOne({ where: { [key]: value, linkPrecedence: "primary" } });
        return response;
    }
    catch (error) {
        if (error instanceof sequelize_1.DatabaseError) {
            throw new Error(error.message);
        }
        throw error;
    }
};
exports.findPrimaryContact = findPrimaryContact;
//Create new contact
const createNewContact = async (email, phoneNumber, linkPrecedence, linkedId) => {
    try {
        const newContact = await contact_1.default.create({ email, phoneNumber, linkPrecedence, linkedId });
        return newContact;
    }
    catch (error) {
        if (error instanceof sequelize_1.DatabaseError) {
            throw new Error(error.message);
        }
    }
};
exports.createNewContact = createNewContact;
//Find secondory contacts
const findSecondoryContacts = async (email, phoneNumber, primaryContactId) => {
    try {
        const secondaryContacts = await contact_1.default.findAll({
            where: {
                [sequelize_2.Op.or]: [
                    { email },
                    { phoneNumber },
                    { linkedId: primaryContactId }
                ],
                linkPrecedence: 'secondory'
            }
        });
        return secondaryContacts;
    }
    catch (error) {
        if (error instanceof sequelize_1.DatabaseError) {
            throw new Error(error.message);
        }
    }
};
exports.findSecondoryContacts = findSecondoryContacts;
const findSecondoryContact = async (email, phoneNumber) => {
    try {
        const secondoryContact = await contact_1.default.findOne({ where: { email, phoneNumber, linkPrecedence: "secondory" } });
        return secondoryContact;
    }
    catch (error) {
        if (error instanceof sequelize_1.DatabaseError) {
            throw new Error(error.message);
        }
    }
};
exports.findSecondoryContact = findSecondoryContact;
//# sourceMappingURL=user.js.map