import json
from sklearn.feature_extraction.text import TfidfVectorizer

with open('./public/data/output.json', 'r') as file:
    data = json.load(file)

size = len(data)
vectorizer = TfidfVectorizer(stop_words='english')
testa = sorted(data)[:24]
print(len(testa))

original_data = []
vectorized_data = []
i = 0
for recipe_id, recipe_data in data.items():
    if 'title' not in recipe_data or recipe_data['title'] is None:
        continue
    title = recipe_data.get('title', '')
    ingredients = recipe_data.get('ingredients', [])
    # instructions = recipe_data.get('instructions', '')
    ingredients = [ingredient if ingredient is not None else '' for ingredient in ingredients]
    text = ' '.join([title, ' '.join(ingredients)])

    original_data.append({
        'recipe_id': recipe_id,
        'title': title,
        'ingredients': ingredients,
    })

    vectorized_data.append({
        'recipe_id': recipe_id,
        'title_ingredients_vector': vectorizer.fit_transform([text]).todense().tolist()[0]
    })
    i += 1
    print(f'receita {i} de {size} vetorizada')

with open('./public/data/recipes_vectorized.json', 'w') as file:
    json.dump(vectorized_data, file, indent=2)

