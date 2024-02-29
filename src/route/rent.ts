import express from "express"
import { createrent, readrent, updaterent, deleterent } from "../controller/rent"


// import app from "./bangunDatar"

const app = express();
/** allow to read a json from body */
app.use(express.json());

/**address from event data */
app.get('/rent', readrent)
/** adrress for add new concert */
app.post('/rent', createrent)
app.put('/rent/:idrent', updaterent)
app.delete('/rent/:idrent', deleterent)

export default app;