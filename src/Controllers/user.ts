import { findPrimaryContact, createNewContact } from "../Helpers/user"

const identifyContact = async (email?: string, phoneNumber?: string) => {


    try {

        if (!email && !phoneNumber) throw new Error("Please provide neccessory details")

        let primaryAccount = null
        // If email exists in Request take that contact details if the contact is exists
        if (email) {
            const key = "email",
                primaryAccount = await findPrimaryContact(key, email)
        }

        //If primary account details not found using email find using phoneNumber
        if (!primaryAccount && phoneNumber) {

            const key = "phoneNumber"
            primaryAccount = await findPrimaryContact(key, phoneNumber)
        }
        // If account details not found regarding number or email create a new one
        if (!primaryAccount) {

            primaryAccount = await createNewContact(email, phoneNumber)
        }
        
        return primaryAccount
    } catch (error) {



    }
}
