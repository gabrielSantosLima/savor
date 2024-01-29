import { Recipe } from "./Recipe";

export interface Recommendation {
    recipe: Recipe;
    score: number;
}