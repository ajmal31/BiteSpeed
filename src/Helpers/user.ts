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
    }
}
