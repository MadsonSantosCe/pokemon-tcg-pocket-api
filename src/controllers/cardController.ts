import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";
import { CardDataAnalyzer } from "../services/cardDataService";
import { formatJson } from "../utils/formatJson";
import { mapJsonToPokemonCard } from "../services/cardService";
import fs from "fs";

export const getAll = async (req: Request, res: Response) => {
  let pokemons = await Pokemon.find();
  res.json(pokemons);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findById(id);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon não encontrado" });
    }

    return res.status(200).json(pokemon);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPokemon = await Pokemon.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPokemon) {
      return res.status(404).json({ error: "Pokémon não encontrado" });
    }

    return res.status(200).json(updatedPokemon);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPokemon = await Pokemon.findByIdAndDelete(id);

    if (!deletedPokemon) {
      return res.status(404).json({ error: "Pokémon não encontrado" });
    }

    return res.status(200).json({ message: "Pokémon deletado com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const cardUpload = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  try {
    const responseText = await processCardData(req.file.filename);
    if (!responseText) {
      return res.status(400).json({ error: "Erro ao processar o arquivo" });
    }

    const responseJson = formatJson(responseText);
    const pokemonCard = await mapJsonToPokemonCard(responseJson);

    if (!pokemonCard) {
      return res.status(400).json({ error: "Falha ao mapear JSON para carta" });
    }

    await pokemonCard.save();
    deleteFile(req.file.path);
    return res.json(pokemonCard);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao processar a imagem", details: error });
  }
};

const processCardData = async (filename: string): Promise<string | null> => {
  if (!filename) return null;
  const result = await CardDataAnalyzer(filename);
  if (typeof result === "string") {
    return result;
  }
  return null;
};

export const deleteFile = (filePath: string): void => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Erro ao excluir o arquivo:", err);
    }
  });
};
