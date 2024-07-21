import Contact from "../Model/contact";
import sequelize from "../Config/database";
import { DatabaseError, Op } from "sequelize";

/**
 * Finds a primary contact by a given key and value.
 * @param key The key to search by (e.g., 'email' or 'phoneNumber').
 * @param value The value to search for.
 * @returns The primary contact if found, otherwise null.
 */
export const findPrimaryContact = async (key: string, value: string) => {
    try {
        return await Contact.findOne({ where: { [key]: value, linkPrecedence: "primary" } });
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(`Database error: ${error.message}`);
        }
        throw error;
    }
};

/**
 * Creates a new contact.
 * @param email The email of the contact.
 * @param phoneNumber The phone number of the contact.
 * @param linkPrecedence The link precedence of the contact ('primary' or 'secondary').
 * @param linkedId The ID of the primary contact, if this is a secondary contact.
 * @returns The newly created contact.
 */
export const createNewContact = async (email?: string, phoneNumber?: string, linkPrecedence?: string, linkedId?: string) => {
    try {
        return await Contact.create({ email, phoneNumber, linkPrecedence, linkedId });
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(`Database error: ${error.message}`);
        }
        throw error;
    }
};

/**
 * Finds all secondary contacts related to a given email, phone number, or primary contact ID.
 * @param email The email to search for.
 * @param phoneNumber The phone number to search for.
 * @param primaryContactId The ID of the primary contact.
 * @returns A list of secondary contacts.
 */
export const findSecondaryContacts = async (email?: string, phoneNumber?: string, primaryContactId?: string) => {
    try {
        return await Contact.findAll({
            where: {
                [Op.or]: [
                    { email },
                    { phoneNumber },
                    { linkedId: primaryContactId }
                ],
                linkPrecedence: 'secondary'
            }
        });
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(`Database error: ${error.message}`);
        }
        throw error;
    }
};

/**
 * Finds a secondary contact by email or phone number.
 * @param email The email to search for.
 * @param phoneNumber The phone number to search for.
 * @returns The secondary contact if found, otherwise null.
 */
export const findSecondaryContact = async (email?: string, phoneNumber?: string) => {
    try {
        return await Contact.findOne({ where: { email, phoneNumber, linkPrecedence: "secondary" } });
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(`Database error: ${error.message}`);
        }
        throw error;
    }
};
