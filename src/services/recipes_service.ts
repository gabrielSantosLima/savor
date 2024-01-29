import recipes from '../../public/data/receitas.json';
import { Recipe } from "../entities/recipes";

export interface Recommendation {
  recipe: Recipe;
  score: number;
}
export class RecipeService {

    fetchAll(): Recipe[]{
      return recipes as Recipe[]
    }

    bm25(query: string, tags: string[], document: Recipe, quantityOfRecipes: number): number {
        const k1 = 1.5;
        const b = 0.75;
        const tagWeight = 0.9
        const cleanedQuery = query
        .replace(/\s(a|e|o|ou|na|no|de|da|do|um|uma|os|as|com|em|como)\s/gi, ' ') 
        .replace(/\s+/g, ' ')
        .trim();
        const queryTerms = cleanedQuery.split(' ');
        const terms = [...queryTerms, ...tags];
        const instructions = document.instructions.join(' ').toLowerCase();
        const ingredients = document.ingredients.join(' ').toLowerCase();
        const avgLength = (document.ingredients.length 
                          + instructions.split(' ').length 
                          + document.title.split(' ').length 
                          + cleanedQuery.split(' ').length) / 4;
        let score = 0;
      
        for (const term of terms) {
          const termFrequency = (ingredients + ' ' + instructions + ' ' + document.title.toLowerCase()).split(term.toLowerCase()).length - 1;
          const documentLength = document.ingredients.length + instructions.split(' ').length + document.title.split(' ').length;

          const idf = Math.log((quantityOfRecipes + 0.5) / (termFrequency + 0.5) + 1.0);
          
          let numerator;
          if (tags.includes(term)){
              numerator = termFrequency * (k1 + 1) * tagWeight;
          } else {
            numerator = termFrequency * (k1 + 1);
          }

          const denominator = termFrequency + k1 * (1 - b + b * (documentLength / avgLength));
      
          score += idf * (numerator / denominator);
        }
      
        return score;
      }
    
    searchRecipes(query: string, tags: string[]): Recommendation[] {
        const scores: { recipe: Recipe; score: number }[] = [];
        const quantityOfRecipes = recipes.length
        for (const recipe of recipes) {
          const score = this.bm25(query, tags, recipe, quantityOfRecipes);
          scores.push({ recipe, score });
        }
      
        scores.sort((a, b) => b.score - a.score);
      
        return scores.filter(item => item.score >= 1);
    }

}
