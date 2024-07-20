import { createNewContact, findPrimaryContact, findSecondoryContacts } from "../Helpers/user"
import { Request, Response } from "express"

const findOrCreateContact = async (email?: string, phoneNumber?: string) => {

    try {

        let primaryContact = null
        // If email exists in Request take that contact details if the contact is exists
        if (email) {
            const key = "email",
                primaryContact = await findPrimaryContact(key, email)
                console.log("email primary",primaryContact)
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
                //create secondory contacts
                const linkPrecedence = "secondory"
                const { id } = primaryContact
                const secondoryContact = await createNewContact(email, phoneNumber, linkPrecedence,id)

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

    // Find or create contact
    const primaryContact = await findOrCreateContact(email, phoneNumber)
    const { id } = primaryContact
    const secondoryContacts = await findSecondoryContacts(email, phoneNumber, id)

    console.log(primaryContact)


} 
