import { KeyboardEvent, useRef, useState } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import RecipeCard from "../../components/RecipeCard";
import { Recipe } from "../../entities/recipes";
import { Tag } from "../../entities/tags";

import "./styles.css";

import LogoImg from "../../assets/badget.svg";

export const MainPage: React.FC = () => {
  // Filters
  const [tags, setTags] = useState<Tag[]>([]);
  const tagIptRef = useRef<HTMLInputElement>(null);

  // Found recipes
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();

  function renderRecipe(recipe: Recipe, index: number) {
    return <RecipeCard key={`recipe-${index}`} recipe={recipe} />;
  }

  function handleRemoveTag(tag: Tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function renderTag(tag: Tag, index: number) {
    return (
      <li key={`tag-${index}`} className="tag">
        <label className="tag-name">{tag}</label>
        <a className="close" onClick={() => handleRemoveTag(tag)}>
          <CloseIcon size={18} />
        </a>
      </li>
    );
  }

  function handleCreateTag(event: KeyboardEvent<HTMLInputElement>) {
    const { key, currentTarget } = event;
    if (key === "Enter") {
      const value = currentTarget["value"];
      if (!tags.find((t) => t === value)) setTags([...tags, value]);
      if (tagIptRef && tagIptRef.current) tagIptRef.current.value = "";
    }
  }

  return (
    <div className="main-page">
      <header className="header">
        <img src={LogoImg} alt="Savor logo" className="logo" />
      </header>

      <div className="actions">
        <input
          type="text"
          className="ipt"
          placeholder="Pesquise por receitas..."
          autoFocus
        />
        <div className="input-tag">
          <input
            type="text"
            className="ipt"
            placeholder="Adicione tags a sua pesquisa..."
            id="ipt-tag"
            onKeyDown={handleCreateTag}
            ref={tagIptRef}
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
