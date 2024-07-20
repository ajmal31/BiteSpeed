import { findPrimaryContact, createNewContact } from "../Helpers/user"
import { Request, Response } from "express"

const findOrCreateContact = async (email?: string, phoneNumber?: string) => {

    try {

        let primaryContact = null
        // If email exists in Request take that contact details if the contact is exists
        if (email) {
            const key = "email",
                primaryContact = await findPrimaryContact(key, email)
        }

        //If primary Contact details not found using email find using phoneNumber
        if (!primaryContact && phoneNumber) {

            const key = "phoneNumber"
            primaryContact = await findPrimaryContact(key, phoneNumber)
        }
        // If Contact details not found regarding number or email create a new one
        if (!primaryContact) {

            primaryContact = await createNewContact(email, phoneNumber)
        }

        return primaryContact
    } catch (error) {



    }
}

export const identifyContact =async (req: Request, res: Response) => {

    const { email, phoneNumber } = req.body

    if (!email && !phoneNumber) res.status(400).json({ error: 'Either email or phoneNumber must be provided' })

    // Find or create contact
    const primaryContact = await findOrCreateContact(email, phoneNumber)

} 
