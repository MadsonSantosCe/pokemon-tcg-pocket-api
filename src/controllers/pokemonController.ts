import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";

export const create = async (req: Request, res: Response) => {
  try {
    
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    return res.status(201).json(pokemon);

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  let pokemons = await Pokemon.find();
  res.json(pokemons);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findById(id);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    return res.status(200).json(pokemon);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPokemon = await Pokemon.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedPokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
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
      return res.status(404).json({ error: "Pokémon not found" });
    }

    return res.status(200).json({ message: "Pokémon deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const uploadCard = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  res.status(200).json({ message: "File uploaded successfully" });
}
