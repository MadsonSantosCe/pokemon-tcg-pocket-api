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
  // logic to get pokemon by id
};

export const update = async (req: Request, res: Response) => {
  // logic to update a pokemon by id
};

export const remove = async (req: Request, res: Response) => {
  // logic to delete a pokemon by id
};
