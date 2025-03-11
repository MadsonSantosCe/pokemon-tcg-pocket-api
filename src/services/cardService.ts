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

interface EnergyCost {
  [key: string]: number;
}

export const mapJsonToPokemonCard = async (jsonData: any) => {
  try {
    const data = jsonData;
    const ability =
      data.ability && (data.ability.name || data.ability.description)
        ? {
            name: data.ability.name || "",
            description: data.ability.description || "",
          }
        : null;

    const weakness =
      data.weakness && (data.weakness.type || data.weakness.bonus)
        ? {
            type: data.weakness.type || "",
            bonus: isNaN(parseInt(data.weakness.bonus.replace("+", ""), 10))
              ? 0
              : parseInt(data.weakness.bonus.replace("+", ""), 10),
          }
        : null;

    const pokemonCard = new Pokemon({
      name: data.name || "",
      stage: data.stage || "",
      evolvesFrom: data.evolvesFrom || "",
      hp: isNaN(parseInt(data.hp, 10)) ? 0 : parseInt(data.hp, 10),
      type: data.type || "",
      ability: ability,
      attacks: data.attacks
        ? data.attacks.map((attack: any) => ({
            name: attack.name || "",
            energyCost: attack.energyCost
              ? attack.energyCost
                  .map((cost: EnergyCost) => {
                    let filteredCost: EnergyCost = {};
                    energytypes.forEach((type) => {
                      if (cost[type] !== undefined && cost[type] > 0) {
                        filteredCost[type] = cost[type];
                      }
                    });
                    return filteredCost;
                  })
                  .filter((cost: EnergyCost) => Object.keys(cost).length > 0)
              : [],
            damage: isNaN(parseInt(attack.damage, 10))
              ? 0
              : parseInt(attack.damage, 10),
            effect: attack.effect || "",
          }))
        : [],
      weakness: weakness,
      retreatCost: isNaN(parseInt(data.retreatCost, 10))
        ? 0
        : parseInt(data.retreatCost, 10),
      number: data.number || "",
      exRule: data.exRule || "",
    });

    return pokemonCard;
  } catch (error) {
    console.error("Erro ao criar a entidade PokemonCard:", error);
    return null;
  }
};
