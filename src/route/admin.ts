import express from "express"
import { createadmin, readadmin, updateadmin, deleteadmin, login } from "../controller/admin"
import { verifyAdmin } from "../middleware/verifyAdmin";
// import app from "./bangunDatar"

const app = express()
/** allow to read a json from body */
app.use(express.json());

/**address from event data */
app.get('/admin', readadmin)
/** adrress for add new concert */
app.post('/admin', createadmin)
app.put('/admin/:id', updateadmin)
app.delete('/admin/:id', deleteadmin)
app.post('/users/login', login)

export default app;