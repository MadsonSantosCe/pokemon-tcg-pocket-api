import Pokemon from "../models/Pokemon";

const energytypes = [
  "Colorless",
  "Grass",
  "Fire",
  "Water",
  "Lightning",
  "Psychic",
  "Fighting",
  "Darkness",
  "Metal",
];

export const mapJsonToPokemonCard = async (jsonData: any) => {
  try {

    const data = jsonData;
    const pokemonCard = new Pokemon({
      name: data.name,
      stage: data.stage,
      evolvesFrom: data.evolvesFrom || "",
      hp: parseInt(data.hp, 10),
      type: data.type,
      ability: data.ability
        ? {
            name: data.ability.name,
            descrition: data.ability.description,
          }
        : "",
      attacks: data.attacks.map((attack: any) => ({
        name: attack.name,
        energyCost: attack.energyCost.map((cost: any) => {
          let filteredCost: { [key: string]: number } = {};
          energytypes.forEach((type) => {
            if (cost[type]) {
              filteredCost[type.toLowerCase()] = cost[type];
            }
          });
          return filteredCost;
        }),
        damage: parseInt(attack.damage, 10) || 0,
        description: attack.description || "",
      })),
      weakness: {
        type: data.weakness.type,
        bonus: parseInt(data.weakness.bonus, 10),
      },
      retreatCost: parseInt(data.retreatCost, 10),
      number: data.number,
      exRule: data.exRule || "",
    });

    await pokemonCard.save();
    console.log("PokemonCard salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao criar a entidade PokemonCard:", error);
  }
};
