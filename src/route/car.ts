import express from "express"
import { createcar, readcar, updatecar, deletecar } from "../controller/car"
import { verifyAdmin } from "../middleware/verifyAdmin";
// import app from "./bangunDatar"

const app = express()
/** allow to read a json from body */
app.use(express.json());

/**address from event data */
app.get('/car',readcar)
/** adrress for add new concert */
app.post('/car',createcar)
app.put('/car/:Id',updatecar)
app.delete('/car/:Id',deletecar)
export default app;