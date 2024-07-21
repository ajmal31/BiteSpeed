import { createNewContact, findPrimaryContact, findSecondoryContact, findSecondoryContacts } from "../Helpers/user"
import { Request, Response } from "express"

const findOrCreateSecondoryContact = async (primaryContactId?: string, email?: string, phoneNumber?: string) => {

    //create secondory contacts
    const linkPrecedence = "secondory"
    let secondoryContact = null

    secondoryContact = await findSecondoryContact(email, phoneNumber)
    if (!secondoryContact) {
        const secondoryContact = await createNewContact(email, phoneNumber, linkPrecedence, primaryContactId)
    }

    return secondoryContact
}

const findOrCreateContact = async (email?: string, phoneNumber?: string) => {

    try {

        let primaryContact = null
        // If email exists in Request take that contact details if the contact is exists
        if (email) {
            const key = "email"
            primaryContact = await findPrimaryContact(key, email)
        }

        //If primary Contact details not found using email find using phoneNumber
        if (!primaryContact && phoneNumber) {

            const key = "phoneNumber"
            primaryContact = await findPrimaryContact(key, phoneNumber)
        }
        if (!primaryContact) {
            const linkPrecedence = "primary"
            primaryContact = await createNewContact(email, phoneNumber, linkPrecedence)

        } else {

            if (primaryContact.email !== email || primaryContact.phoneNumber !== phoneNumber) {

                const { id } = primaryContact
                await findOrCreateSecondoryContact(id, email, phoneNumber)

            }
        }

        return primaryContact
    } catch (error) {
        throw new Error(error)
    }
}

export const identifyContact = async (req: Request, res: Response) => {

    const { email, phoneNumber } = req.body

    if (!email && !phoneNumber) return res.status(400).json({ error: 'Either email or phoneNumber must be provided' })

    try {
        // Find or create contact
        const primaryContact = await findOrCreateContact(email, phoneNumber)
        const { id } = primaryContact

        //Find secondories
        const secondoryContacts = await findSecondoryContacts(email, phoneNumber, id)

        const emails = [primaryContact.email].filter(Boolean)
        const phoneNumbers = [primaryContact.phoneNumber].filter(Boolean)
        const secondaryContactIds = secondoryContacts?.map((contact: any) => contact.id)

        secondoryContacts.forEach((contact: any) => {
            if (contact?.email && !emails.includes(contact.email)) emails.push(contact.email)
            if (contact?.phoneNumber && !phoneNumbers.includes(contact.phoneNumbers)) phoneNumbers.push(contact.phoneNumber)
        })

        res.status(200).json({
            contact: {
                primaryContactId: id,
                emails,
                phoneNumbers,
                secondaryContactIds
            }
        })
    } catch (error) {
          res.status(500).json({message:error.message})
    }


} 
