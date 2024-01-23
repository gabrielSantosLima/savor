import { useState } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import RecipeCard from "../../components/RecipeCard";
import { Recipe } from "../../entities/recipes";
import { Tag } from "../../entities/tags";

import "./styles.css";

export const MainPage: React.FC = () => {
  // Filters
  const [tags, setTags] = useState<Tag[]>([]);

  // Found recipes
  const [recipes, setRecipes] = useState<Recipe[] | undefined>([
    {
      id: "1",
      ingredients: ["1 rabanada", "2 kilos de banana"],
      instructions:
        "Instrução grande demaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaais",
      pictureLink: "chuleta",
      title: "Como fazer rabanada",
    },
  ]);

  function renderRecipe(recipe: Recipe, index: number) {
    return <RecipeCard key={`recipe-${index}`} recipe={recipe} />;
  }

  function renderTag(tag: Tag, index: number) {
    return (
      <li key={`tag-${index}`} className="tag">
        <label className="tag-name">{tag}</label>
        <a className="close">
          <CloseIcon size={16} />
        </a>
      </li>
    );
  }

  return (
    <div className="main-page">
      <div className="actions">
        <input
          type="text"
          className="ipt"
          placeholder="Pesquise por receitas..."
        />
        <div className="input-tag">
          <input
            type="text"
            className="ipt"
            placeholder="Adicione tags a sua pesquisa..."
          />
          <ul className="tags">{tags.map(renderTag)}</ul>
        </div>
      </div>

      <main className="main">
        {recipes && recipes.length > 0 ? (
          <ul className="recipes">{recipes.map(renderRecipe)}</ul>
        ) : (
          <label>Nenhuma receita para listar.</label>
        )}
      </main>
    </div>
  );
};
