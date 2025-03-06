import { Schema, model, Document } from 'mongoose';

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
    descrition: number;
}

interface PokemonCard extends Document {
    name: string;
    stage: string;
    evolvesFrom: string;
    hp: number;
    type: string;
    ability?: string;
    attacks: Attack[];
    weakness: Weakness;
    retreatCost: number;
    number: string;
    exRule: string;
}

const EnergyCostSchema = new Schema<EnergyCost>({  
    colorless: Number,
    grass: Number,
    fire: Number,
    water: Number,
    lightning: Number,
    psychic: Number,
    fighting: Number,
    darkness: Number,
    metal: Number,
}, { _id: false });

const AttackSchema = new Schema<Attack>({
    name: { type: String, required: true },
    energyCost: { type: [EnergyCostSchema], required: true },
    damage: { type: Number, required: true },
    description: { type: String, default: "" }
}, { _id: false });

const WeaknessSchema = new Schema<Weakness>({
    type: { type: String, required: true },
    bonus: { type: Number, required: true }
}, { _id: false });

const AbilitySchema = new Schema<Ability>({
    name: { type: String},
    descrition: { type: Number}
}, { _id: false });

const PokemonCardSchema = new Schema<PokemonCard>({
    name: { type: String, required: true },
    stage: { type: String, required: true },
    evolvesFrom: { type: String, default: "" },
    hp: { type: Number, required: true },
    type: { type: String, required: true },
    ability: { type: AbilitySchema, default: null },
    attacks: { type: [AttackSchema], default: [] },
    weakness: { type: WeaknessSchema, required: true },
    retreatCost: { type: Number, default: null },
    number: { type: String, required: true },
    exRule: { type: String, default: "" }
});

const PokemonCardModel = model<PokemonCard>('PokemonCard', PokemonCardSchema);

export default PokemonCardModel;