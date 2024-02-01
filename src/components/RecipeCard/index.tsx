import { SyntheticEvent, useState } from "react";
import { MdExpandMore as ArrowIcon } from "react-icons/md";

import "./styles.css";

import DefaultImg from "../../assets/default.svg";
import { Recipe } from "../../entities/recipes";
import { Recommendation } from "../../services/recipes_service";

interface Props {
  recommendation: Recommendation | Recipe;
}

const RecipeCard: React.FC<Props> = ({ recommendation }) => {
  const [expanded, setExpanded] = useState(false);
  const recipe =
    "score" in recommendation ? recommendation.recipe : recommendation;

  // Short Form
  const instructionsShortForm = recipe.instructions.join("\n")
    ? recipe.instructions.join(" ").substring(0, 44) + "... "
    : "Sem instruções";

  const titleShortForm = recipe.title
    ? recipe.title.substring(0, 44) + "... "
    : "Sem nome";

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

  function handleImageError(
    event: SyntheticEvent<HTMLImageElement>,
    imagePath: string,
    cb?: (event: SyntheticEvent<HTMLImageElement>) => void
  ) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = imagePath;
    console.clear();
    if (cb) {
      cb(event);
    }
  }

  return (
    <li className={`recipe ${expanded ? "expanded" : ""}`}>
      <div className="short">
        <header className="header">
          <img
            onError={(event) => handleImageError(event, DefaultImg)}
            src={recipe.picture_link}
            alt="Savor Logo"
            className="logo"
          />
        </header>
        <div className="info">
          <h2 className="title">{titleShortForm}</h2>
          <label className="title">Passo a Passo</label>
          <p className="instructions">{instructionsShortForm}</p>
        </div>
      </div>

      <div className="expand">
        <header className="header">
          <img
            onError={(event) => handleImageError(event, DefaultImg)}
            src={DefaultImg}
            alt="Savor Logo"
            className="logo"
          />
        </header>
        <div className="info">
          <h2 className="title">{recipe.title}</h2>
          <label className="title">Ingredientes</label>
          <ul className="ingredients">
            {recipe.ingredients ? (
              recipe.ingredients.map(renderIngredient)
            ) : (
              <li>Sem ingredientes</li>
            )}
          </ul>

          <label className="title">Passo a Passo</label>
          <p className="instructions">{recipe.instructions}</p>

          {"score" in recommendation && (
            <div className="score">
              <label className="title">Score de busca</label>
              <p className="score-number">
                {recommendation.score.toFixed(2)} pontos
              </p>
            </div>
          )}
        </div>
      </div>

      {/* <div className="rating">
        <button className="like">
          <LikeIcon size={24} />
        </button>
        <button className="dislike">
          <DislikeIcon size={24} />
        </button>
      </div> */}

      <a className="see-details" onClick={handleToggleExpand}>
        <ArrowIcon className="icon" size={28} />
      </a>
    </li>
  );
};

export default RecipeCard;
