import express from "express"
export const baseRoutes = () => {

    const router = express.Router()
    
    router.route('/').get((req,res)=>res.json(`Helo Bite Speed. Thank you for taking a look`))
    
    return router

}
