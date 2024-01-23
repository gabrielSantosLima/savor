import { useState } from "react";
import {
  AiOutlineDislike as DislikeIcon,
  AiOutlineLike as LikeIcon,
} from "react-icons/ai";
import { MdExpandMore as ArrowIcon } from "react-icons/md";
import { Recipe } from "../../entities/recipes";

import "./styles.css";

import LogoImg from "../../assets/badget.svg";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  // Short Form
  const instructionsShortForm = recipe.instructions.substring(0, 64) + "...";

  function handleToggleExpand() {
    setExpanded(!expanded);
  }

  function renderIngredient(ingredient: string, index: number) {
    return (
      <li key={`ingredient-${index}`} className="ingredient">
        {ingredient}
      </li>
    );
  }

  return (
    <li className={`recipe ${expanded ? "expanded" : ""}`}>
      <div className="short">
        <header className="header">
          <img src={LogoImg} alt="Savor Logo" className="logo" />
          <h2 className="title">Teste</h2>
        </header>
        <div className="info">
          <label className="title">Instruções</label>
          <p className="instructions">{instructionsShortForm}</p>
        </div>
      </div>

      <div className="expand">
        <header className="header">
          <img src={LogoImg} alt="Savor Logo" className="logo" />
          <h2 className="title">Teste</h2>
        </header>
        <div className="info">
          <label className="title">Ingredientes</label>
          <ul className="ingredients">
            {recipe.ingredients.map(renderIngredient)}
          </ul>

          <label className="title">Instruções</label>
          <p className="instructions">{recipe.instructions}</p>
        </div>
      </div>

      <div className="rating">
        <button className="like">
          <LikeIcon size={24} />
        </button>
        <button className="dislike">
          <DislikeIcon size={24} />
        </button>
      </div>

      <a className="see-details" onClick={handleToggleExpand}>
        <ArrowIcon size={24} />
      </a>
    </li>
  );
};

export default RecipeCard;
