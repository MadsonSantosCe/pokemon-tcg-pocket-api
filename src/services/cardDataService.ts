import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const CardDataAnalyzer = async (filename: string) => {
  try {
    const filePath = path.join(__dirname, "public", "uploads", filename);
    const image = fs.readFileSync(filePath);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Detect and extract all relevant information from a Pokémon card in the provided image. The response should be structured in the following JSON format: { \"name\": \"Pokémon name\", \"stage\": \"Evolution stage (Basic, Stage 1, Stage 2)\", \"evolvesFrom\": \"Previous Pokémon name, if applicable\", \"hp\": \"Hit Points (HP)\", \"type\": \"Pokémon type (Grass, Fire, Water, etc.)\", \"ability\": { \"name\": \"Ability name, if applicable\", \"description\": \"Ability description, if applicable\" }, \"attacks\": [ { \"name\": \"Attack name\", \"energyCost\": [{ \"energy type (e.g., Grass)\": amount }], \"damage\": \"Attack damage (if available)\", \"description\": \"Attack description (if available)\" } ], \"weakness\": { \"type\": \"Weakness type (e.g., Fire)\", \"bonus\": \"Weakness bonus (e.g., +20)\" }, \"retreatCost\": \"Number of energy cards required to retreat\", \"number\": \"Card number within the set\", \"exRule\": \"Special rules for the card, if applicable (EX, GX, etc.)\" }`;

    const imagePart = {
      inlineData: {
        data: image.toString("base64"),
        mimeType: "image/webp",
      },
    };

    const result = await model.generateContent([{ text: prompt }, imagePart]);
    let responseText = await result.response.text();    
    return responseText;
    
  } catch (error) {
    return { error: "Erro ao processar a imagem", details: error };
  }
};