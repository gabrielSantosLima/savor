import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { RecipeService } from './services/RecipeService';

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

const recipeService = new RecipeService();

app.get('/recommend', (req, res) => {
    try {
        const { query, tags }: { query: string; tags: string[]} = req.body;
        const result = recipeService.searchRecipes(query, tags);
        res.json(result);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Erro no servidor'})
    }
})

app.get('/', (req, res) => {
    res.send('Savor API')
})


app.listen(PORT)
