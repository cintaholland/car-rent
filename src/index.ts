import express, { Request, Response } from "express"
import { request } from "http";
import routeradmin from "./route/admin"
import routecar from "./route/car"
import routerent from "./route/rent"

const app = express()
const PORT = 8000
app.use(express.json())

app.use(routeradmin);
app.use(routecar)
app.use(routerent);

/* run sever*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})