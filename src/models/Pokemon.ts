import { Schema, model, Document } from "mongoose";

interface EnergyCost {
  [key: string]: number;
}

interface Attack {
  name: string;
  energyCost: EnergyCost[];
  damage: number;
  description?: string;
}

interface Weakness {
  type: string;
  bonus: number;
}

interface Pokemon extends Document {
  name: string;
  stage: string;
  evolvesFrom?: string;
  hp: number;
  type: string;
  hability?: string;
  attacks?: Attack[];
  weakness?: Weakness;
  retreatCost?: number;
  description: string;
  number: string;
  height: string;
  weight: string;
  exRule?: string;
}

const AttackSchema = new Schema<Attack>({
  name: { type: String, required: true },
  energyCost: [{ type: Map, of: Number }],
  damage: { type: Number, required: true },
  description: { type: String, default: "" },
});

const WeaknessSchema = new Schema<Weakness>({
  type: { type: String, required: true },
  bonus: { type: Number, required: true },
});

const PokemonSchema = new Schema<Pokemon>({
  name: { type: String, required: true },
  stage: { type: String, required: true },
  evolvesFrom: { type: String, default: "" },
  hp: { type: Number, required: true },
  type: { type: String, required: true },
  hability: { type: String, default: "" },
  attacks: { _id: false, type: [AttackSchema], default: [] },
  weakness: { _id: false, type: WeaknessSchema, default: null },
  retreatCost: { type: Number, default: null },
  number: { type: String, required: true },
  exRule: { type: String, default: "" },
});

const PokemonModel = model<Pokemon>("Pokemon", PokemonSchema);

export default PokemonModel;
