import { Recipe } from "../entities/recipes";
import { Tag } from "../entities/tags";

export interface Recommendation {
  recipes: Recipe[];
  precision: number;
  revocation: number;
}

export class RecipeService {
  async fetch(): Promise<Recipe[]> {
    const response = await fetch("recipes.json");
    const data = await response.json();
    const recipes: Recipe[] = Object.values(data);
    return recipes;
  }

  async recommend(
    term: string,
    tags: Tag[],
    dataset: Recipe[]
  ): Promise<Recommendation> {
    // TODO implement recommendation
    return {
      precision: 0,
      recipes: [],
      revocation: 0,
    };
  }

  calculateFScore(precision: number, revocation: number) {
    return 2 * ((precision * revocation) / (precision + revocation));
  }
}
