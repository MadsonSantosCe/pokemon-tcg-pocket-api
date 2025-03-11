import fs from "fs";
import path from "path";
import { CardDataAnalyzer } from "../services/cardDataService";
import { formatJson } from "./formatJson";
import { mapJsonToPokemonCard } from "../services/cardService";

const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, "public", "uploads");

export const processUploads = async () => {
  ensureUploadsDirExists();
  await processInitialFiles();
  watchForNewFiles();
};

const ensureUploadsDirExists = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

const processInitialFiles = async () => {
  const files = fs.readdirSync(uploadsDir);
  const firstTenFiles = files.slice(0, 10);

  for (const file of firstTenFiles) {
    await processFile(file);
    await delay(1000);
  }
};

const watchForNewFiles = () => {
  fs.watch(uploadsDir, async (eventType, filename) => {
    if (eventType === "rename" && filename) {
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        await processFile(filename);
        await delay(1000);
      }
    }
  });
};

const processFile = async (file: string) => {
  try {
    console.log(`*********************************`);

    console.log(`Analisando arquivo ${file}`);
    const result = await CardDataAnalyzer(file);

    if (!result) {
      console.error(`Erro ao processar o arquivo ${file}`);
      return;
    }

    const responseJson =
      typeof result === "string" ? formatJson(result) : result;

    console.log(`Mapeando carta ${file}`);
    const pokemonCard = await mapJsonToPokemonCard(responseJson);

    if (!pokemonCard) {
      console.error(`Falha ao mapear JSON para carta no arquivo ${file}`);
      return;
    }

    console.log(`Salvando carta ${file}`);
    await pokemonCard.save();

    console.log(`Deletando arquivo ${file}`);
    deleteFile(path.join(uploadsDir, file));
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${file}:`, error);
  }
};


const deleteFile = (filePath: string): void => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Erro ao excluir o arquivo:", err);
    }
  });
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
