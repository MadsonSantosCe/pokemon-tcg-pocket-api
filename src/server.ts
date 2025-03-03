import app from "./app";
require("dotenv").config();
import mongoose from 'mongoose';

const MONGO_URI = process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.error("Erro: A variável de ambiente MONGO_URI não está definida!");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});