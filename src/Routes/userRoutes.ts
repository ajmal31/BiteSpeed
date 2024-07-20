import express from "express"
import { identifyContact } from "../Controllers/user"
export const userRoutes = () => {

    const router = express.Router()
    
    router.route('/identify')
        .post(identifyContact)

    return router

}
