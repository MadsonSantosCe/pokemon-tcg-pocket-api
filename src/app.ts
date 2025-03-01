import express, { urlencoded } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

export default app;