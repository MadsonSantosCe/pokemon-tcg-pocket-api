import express, { urlencoded } from "express";
import mainRouters from "./routers/mainRouters";
import cors from "cors";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", mainRouters);

export default app;