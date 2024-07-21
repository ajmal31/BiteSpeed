"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyContact = void 0;
const user_1 = require("../Helpers/user");
const findOrCreateSecondoryContact = async (primaryContactId, email, phoneNumber) => {
    //create secondory contacts
    const linkPrecedence = "secondory";
    let secondoryContact = null;
    secondoryContact = await (0, user_1.findSecondoryContact)(email, phoneNumber);
    if (!secondoryContact) {
        const secondoryContact = await (0, user_1.createNewContact)(email, phoneNumber, linkPrecedence, primaryContactId);
    }
    return secondoryContact;
};
const findOrCreateContact = async (email, phoneNumber) => {
    try {
        let primaryContact = null;
        // If email exists in Request take that contact details if the contact is exists
        if (email) {
            const key = "email";
            primaryContact = await (0, user_1.findPrimaryContact)(key, email);
        }
        //If primary Contact details not found using email find using phoneNumber
        if (!primaryContact && phoneNumber) {
            const key = "phoneNumber";
            primaryContact = await (0, user_1.findPrimaryContact)(key, phoneNumber);
        }
        if (!primaryContact) {
            const linkPrecedence = "primary";
            primaryContact = await (0, user_1.createNewContact)(email, phoneNumber, linkPrecedence);
        }
        else {
            if (primaryContact.email !== email || primaryContact.phoneNumber !== phoneNumber) {
                const { id } = primaryContact;
                await findOrCreateSecondoryContact(id, email, phoneNumber);
            }
        }
        return primaryContact;
    }
    catch (error) {
        throw new Error(error);
    }
};
const identifyContact = async (req, res) => {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber)
        return res.status(400).json({ error: 'Either email or phoneNumber must be provided' });
    try {
        // Find or create contact
        const primaryContact = await findOrCreateContact(email, phoneNumber);
        const { id } = primaryContact;
        //Find secondories
        const secondoryContacts = await (0, user_1.findSecondoryContacts)(email, phoneNumber, id);
        const emails = [primaryContact.email].filter(Boolean);
        const phoneNumbers = [primaryContact.phoneNumber].filter(Boolean);
        const secondaryContactIds = secondoryContacts?.map((contact) => contact.id);
        secondoryContacts.forEach((contact) => {
            if (contact?.email && !emails.includes(contact.email))
                emails.push(contact.email);
            if (contact?.phoneNumber && !phoneNumbers.includes(contact.phoneNumbers))
                phoneNumbers.push(contact.phoneNumber);
        });
        res.status(200).json({
            contact: {
                primaryContactId: id,
                emails,
                phoneNumbers,
                secondaryContactIds
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.identifyContact = identifyContact;
//# sourceMappingURL=user.js.map