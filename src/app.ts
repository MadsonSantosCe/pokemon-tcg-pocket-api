import express, { urlencoded } from "express";
import mainRouters from "./routers/mainRouters";
import { connectToDatabase } from "./config/database";
import "./utils/watchUploads";
import cors from "cors";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", mainRouters);

connectToDatabase();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;