import { Schema, model, Document } from "mongoose";

interface EnergyCost {
  colorless?: number;
  grass?: number;
  fire?: number;
  water?: number;
  lightning?: number;
  psychic?: number;
  fighting?: number;
  darkness?: number;
  metal?: number;
}

interface Attack {
  name: string;
  energyCost: EnergyCost[];
  damage: number;
  description: string;
}

interface Weakness {
  type: string;
  bonus: number;
}

interface Ability {
  name: string;
  description: string;
}

interface PokemonCard extends Document {
  name: string;
  stage: string;
  evolvesFrom: string;
  hp: number;
  type: string;
  ability?: Ability;
  attacks: Attack[];
  weakness: Weakness;
  retreatCost: number;
  number: string;
  exRule: string;
}

const EnergyCostSchema = new Schema<EnergyCost>(
  {
    colorless: Number,
    grass: Number,
    fire: Number,
    water: Number,
    lightning: Number,
    psychic: Number,
    fighting: Number,
    darkness: Number,
    metal: Number,
  },
  { _id: false }
);

const AttackSchema = new Schema<Attack>(
  {
    name: { type: String, default: "" },
    energyCost: { type: [EnergyCostSchema], default: [] },
    damage: { type: Number, default: 0 },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const WeaknessSchema = new Schema<Weakness>(
  {
    type: { type: String, default: "" },
    bonus: { type: Number, default: 0 },
  },
  { _id: false }
);

const AbilitySchema = new Schema<Ability>(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const PokemonCardSchema = new Schema<PokemonCard>({
  name: { type: String, default: "" },
  stage: { type: String, default: "" },
  evolvesFrom: { type: String, default: "" },
  hp: { type: Number, default: 0 },
  type: { type: String, default: "" },
  ability: { type: AbilitySchema, default: null },
  attacks: { type: [AttackSchema], default: [] },
  weakness: { type: WeaknessSchema, default: null },
  retreatCost: { type: Number, default: 0 },
  number: { type: String, default: "" },
  exRule: { type: String, default: "" },
});

const PokemonCardModel = model<PokemonCard>("PokemonCard", PokemonCardSchema);

export default PokemonCardModel;
