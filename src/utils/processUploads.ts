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
  
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue; 
    await processFile(file);
    await delay(1000);
  }
};

const watchForNewFiles = () => {
  let processingQueue: string[] = [];
  let isProcessing = false;

  fs.watch(uploadsDir, { persistent: true }, async (eventType, filename) => {
    if (eventType === "rename" && filename && filename.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const filePath = path.join(uploadsDir, filename);      
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        if (!processingQueue.includes(filename)) {
          processingQueue.push(filename);
          processQueue();
        }
      }
    }
  });

  const processQueue = async () => {
    if (isProcessing || processingQueue.length === 0) return;
    
    isProcessing = true;
    try {
      while (processingQueue.length > 0) {
        const file = processingQueue.shift();
        if (file) {
          await processFile(file);
          await delay(1000);
        }
      }
    } catch (error) {
      console.error('Erro no processamento da fila:', error);
    } finally {
      isProcessing = false;
    }
  };
};

const processFile = async (file: string) => {
  const filePath = path.join(uploadsDir, file);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Arquivo não encontrado: ${file}`);
      return;
    }

    console.log(`*********************************`);
    console.log(`Analisando arquivo ${file}`);
    
    const result = await CardDataAnalyzer(file);

    if (!result) {
      console.error(`Erro ao processar o arquivo ${file}`);
      return;
    }

    const responseJson = typeof result === "string" ? formatJson(result) : result;

    console.log(`Mapeando carta ${file}`);
    const pokemonCard = await mapJsonToPokemonCard(responseJson);

    if (!pokemonCard) {
      console.error(`Falha ao mapear JSON para carta no arquivo ${file}`);
      return;
    }

    console.log(`Salvando carta ${file}`);
    await pokemonCard.save();

  } catch (error) {
    console.error(`Erro ao processar o arquivo ${file}:`, error);
  } finally {
    console.log(`Deletando arquivo ${file}`);
    deleteFile(filePath);
  }
};
const deleteFile = (filePath: string): void => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Erro ao excluir o arquivo:", err);
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));