import mongoose from 'mongoose';

export const connectToDatabase = () => {
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
};
