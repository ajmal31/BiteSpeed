import { createNewContact, findPrimaryContact, findSecondaryContact, findSecondaryContacts } from "../Helpers/user";
import { Request, Response } from "express";

/**
 * Finds or creates a secondary contact.
 * @param primaryContactId The ID of the primary contact.
 * @param email The email of the contact.
 * @param phoneNumber The phone number of the contact.
 * @returns The secondary contact.
 */
const findOrCreateSecondaryContact = async (primaryContactId?: string, email?: string, phoneNumber?: string) => {
    const linkPrecedence = "secondary";
    let secondaryContact = await findSecondaryContact(email, phoneNumber);

    if (!secondaryContact) {
        secondaryContact = await createNewContact(email, phoneNumber, linkPrecedence, primaryContactId);
    }

    return secondaryContact;
};

/**
 * Finds or creates a primary contact.
 * @param email The email of the contact.
 * @param phoneNumber The phone number of the contact.
 * @returns The primary contact.
 */
const findOrCreateContact = async (email?: string, phoneNumber?: string) => {
    try {
        let primaryContact = null;

        if (email) {
            primaryContact = await findPrimaryContact("email", email);
        }

        if (!primaryContact && phoneNumber) {
            primaryContact = await findPrimaryContact("phoneNumber", phoneNumber);
        }

        if (!primaryContact) {
            primaryContact = await createNewContact(email, phoneNumber, "primary");
        } else {
            if (primaryContact.email !== email || primaryContact.phoneNumber !== phoneNumber) {
                await findOrCreateSecondaryContact(primaryContact.id, email, phoneNumber);
            }
        }

        return primaryContact;
    } catch (error) {
        throw new Error(`Error finding or creating contact: ${error.message}`);
    }
};

/**
 * Identifies a contact and returns its details.
 * @param req The request object.
 * @param res The response object.
 * @returns The JSON response with contact details.
 */
export const identifyContact = async (req: Request, res: Response) => {
    let { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: 'Either email or phoneNumber must be provided' });
    }
    if(!email)email=null
    if(!phoneNumber)phoneNumber=null

    try {
        const primaryContact = await findOrCreateContact(email, phoneNumber);
        const { id } = primaryContact;

        const secondaryContacts = await findSecondaryContacts(email, phoneNumber, id);
        const emails = [primaryContact.email].filter(Boolean);
        const phoneNumbers = [primaryContact.phoneNumber].filter(Boolean);
        const secondaryContactIds = secondaryContacts?.map((contact: any) => contact.id) || [];

        secondaryContacts.forEach((contact: any) => {
            if (contact?.email && !emails.includes(contact.email)) emails.push(contact.email);
            if (contact?.phoneNumber && !phoneNumbers.includes(contact.phoneNumber)) phoneNumbers.push(contact.phoneNumber);
        });

        return res.status(200).json({
            contact: {
                primaryContactId: id,
                emails,
                phoneNumbers,
                secondaryContactIds
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Error identifying contact: ${error.message}` });
    }
};
