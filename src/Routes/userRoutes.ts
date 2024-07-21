import express from "express"
import { identifyContact } from "../Controllers/user"
export const userRoutes = () => {

    const router = express.Router()
    
    //Routes
    router.route('/identify')
        .post(identifyContact)

    return router

}
