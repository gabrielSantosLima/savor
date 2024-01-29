import requests
from bs4 import BeautifulSoup

html = requests.get("https://revistacasaejardim.globo.com/Casa-e-Comida/Receitas/noticia/2020/09/10-receitas-com-ingredientes-tipicos-da-amazonia.html").content
soup = BeautifulSoup(html, 'html.parser')

recipe_names = []
p_elements = soup.find_all('p') 

with open('output.txt', 'w', encoding='utf-8') as output_file:
    for p in p_elements:
        strong_inside_p = p.find('strong')  
        if strong_inside_p:
            links_inside_strong = strong_inside_p.find_all('a')
            for link in links_inside_strong:
                recipe_names.append({
                    'name': link.text,
                    'link': link['href']
                })

    for recipe in recipe_names:
        try:
            page = requests.get(recipe['link']).content
        except:
            output_file.write(f'Erro ao acessar informações de {recipe["name"]}\n')
            continue

        soup = BeautifulSoup(page, 'html.parser')
        texts = soup.find_all('p')
        for p in texts:
            strongs = p.find('strong')
            if strongs and strongs.text.lower() in "dica":
                continue
            elif strongs:
                output_file.write(strongs.text + '\n')
                output_file.write(f'{recipe["name"]}:\n')
                output_file.write(p.text.strip() + '\n')
                output_file.write('\n\n\n')


