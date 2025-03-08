import Pokemon from "../models/Pokemon";

const energytypes = [
  "colorless",
  "grass",
  "fire",
  "water",
  "lightning",
  "psychic",
  "fighting",
  "darkness",
  "metal",
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
            description: data.ability.description,
          }
        : null,
      attacks: data.attacks
        ? data.attacks.map((attack: any) => ({
            name: attack.name,
            energyCost: attack.energyCost
              ? attack.energyCost.map((cost: any) => {
                  let filteredCost: { [key: string]: number } = {};
                  energytypes.forEach((type) => {
                    if (cost[type] !== undefined && cost[type] > 0) {
                      filteredCost[type] = cost[type];
                    }
                  });
                  return filteredCost;
                })
              : [],
            damage: parseInt(attack.damage, 10) || 0,
            description: attack.description || "",
          }))
        : [],
      weakness: data.weakness
        ? {
            type: data.weakness.type,
            bonus: parseInt(data.weakness.bonus.replace("+", ""), 10),
          }
        : null,
      retreatCost: parseInt(data.retreatCost, 10) || 0,
      number: data.number || "",
      exRule: data.exRule || "",
    });

    return pokemonCard;
  } catch (error) {
    console.error("Erro ao criar a entidade PokemonCard:", error);
  }
};
