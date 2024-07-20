import express, { Express } from "express"
import {dbConnection} from "./Config/database"
import helmet from "helmet"
import xXssProtection from "x-xss-protection"
import morgan from "morgan"

const app: Express = express()

app.use(express.json())

app.use(helmet())

//Preventing Script Injecting Attacks
app.use(xXssProtection())

app.use(morgan("dev"))

app.listen(process.env.PORT, () => {
    console.log(`Server Listening on ${process.env.PORT}`)
})
dbConnection()

