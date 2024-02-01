import { Recipe } from "../entities/recipes";
export interface Recommendation {
  recipe: Recipe;
  score: number;
}
export class RecipeService {

    async fetchAll(): Promise<Recipe[]> {
      const response = await fetch("/data/receitas.json");
      const recipes = (await response.json()) as Recipe[];
      return recipes;
    }

    bm25(querySize: number, terms: string[], document: Recipe, quantityOfRecipes: number): number {
        const k1 = 1.5;
        const b = 0.75;
        const instructions = document.instructions.join(' ').toLowerCase();
        const ingredients = document.ingredients.join(' ').toLowerCase();
        const avgLength = (document.ingredients.length 
                          + instructions.split(' ').length 
                          + document.title.split(' ').length 
                          + querySize) / 4;
        let score = 0;
      
        for (const term of terms) {
          const termFrequency = (ingredients + ' ' + instructions + ' ' + document.title.toLowerCase()).split(term.toLowerCase()).length - 1;
          const documentLength = document.ingredients.length + instructions.split(' ').length + document.title.split(' ').length;

          const idf = Math.log((quantityOfRecipes + 0.5) / (termFrequency + 0.5) + 1.0);
          const numerator = termFrequency * (k1 + 1);
          const denominator = termFrequency + k1 * (1 - b + b * (documentLength / avgLength));
          score += idf * (numerator / denominator);
        }
      
        return score;
      }

      andBM25(querySize: number, terms: string[], document: Recipe, quantityOfRecipes: number) {
        const instructions = document.instructions.join(' ').toLowerCase();
        const ingredients = document.ingredients.join(' ').toLowerCase();
        let score = 0;

        const allTermsPresent = terms.every(term =>
          [document.title, ingredients, instructions].some(topic => topic.includes(term))
        );

        if(allTermsPresent == true) {
          console.log(document.title);
          score = this.bm25(querySize, terms, document, quantityOfRecipes);
        }
        return score
      }
    
      async searchRecipes(query: string, tags: string[]):Promise<Recommendation[]> {
        console.log(tags);
        const recipes = await this.fetchAll();
        const scores: { recipe: Recipe; score: number }[] = [];
        const quantityOfRecipes = recipes.length;
        const cleanedQuery = query
        .replace(/\s(a|o|na|no|de|da|do|um|uma|os|as|com|em|como)\s/gi, ' ') 
        .replace(/\s+/g, ' ')
        // .replace(',', '')
        .trim();
        let terms = cleanedQuery.split(' ');
        const size = terms.length;
        console.log(cleanedQuery);
        const andQuery = cleanedQuery.includes(' e ');
        const orQuery = cleanedQuery.includes(' ou ');
        const isSingleTermQuery = query.trim().split(/\s+/).length === 1;
    
        for (const recipe of recipes) {
            let score;
    
            if (isSingleTermQuery) {
                const term = query.toLowerCase();
                const title = recipe.title.toLowerCase();
                const instructions = recipe.instructions.join(' ').toLowerCase();
                const ingredients = recipe.ingredients.join(' ').toLowerCase();
    
                if (title.includes(term) || instructions.includes(term) || ingredients.includes(term)) {
                    score = 1.5;
                } else {
                    score = 0;
                }
            } else if(andQuery){
              const andList = cleanedQuery.split(' e ').flatMap(item => item.split(' ou ')[0].split(',')); 
              score = this.andBM25(size, andList, recipe, quantityOfRecipes);
              if(orQuery){
                const orList = cleanedQuery.split(' e ')[1].split(' ou ').flatMap(item => item.split(','));
                score =  score + this.bm25(size, orList, recipe, quantityOfRecipes);
                console.log(recipe.title);
                // console.log('score: ', score);
              }
            } else {
              terms = cleanedQuery.replace(/\s(,|ou)/gi, '').split(' ');
              console.log(terms);
              score = this.bm25(size, terms, recipe, quantityOfRecipes);
            }
            scores.push({ recipe, score });
        }
    
        scores.sort((a, b) => b.score - a.score);
    
        return scores.filter(item => item.score >= 1.5);
    }
    
}
