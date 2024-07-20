import Contact from "../Model/contact"
import sequelize from "../Config/database"
import { DatabaseError } from "sequelize"
import { Op } from "sequelize"


export const findPrimaryContact = async (key: string, value: string) => {

    try {
        const response = await Contact.findOne({ where: { [key]: value, linkPrecedence: "primary" } })
        return response
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(error.message)
        }
        throw error
    }

}

//Create new contact
export const createNewContact = async (email?: string, phoneNumber?: string,linkPrecedence?:string,linkedId?:string) => {

    try {
        const newContact = await Contact.create({ email, phoneNumber, linkPrecedence,linkedId })
        return newContact
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(error.message)
        }
    }
}
//Find secondory contacts
export const findSecondoryContacts = async (email?: string, phoneNumber?: string, primaryContactId?: string) => {
    try {
        const secondaryContacts = await Contact.findAll({
            where: {
                [Op.or]: [
                    { email },
                    { phoneNumber },
                    { linkedId: primaryContactId }
                ],
                linkPrecedence: 'secondory'
            }
        });
        return secondaryContacts
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw new Error(error.message)
        }

    }
}

