import ImageUpload from "./ImageUpload";
import FoodGrid from "./FoodGrid";
import GridPlaceHolderImage from "./GridPlaceHolderImage";
import useIngredients from "../hooks/useIngredients";

function Main() {
  const { ingredients, setIngredients } = useIngredients();

  return (
    <main className="flex flex-col justify-center gap-4 p-2 bg-slate-100">
      <ImageUpload setIngredients={setIngredients} />
      {ingredients.length === 0 ? (
        <GridPlaceHolderImage />
      ) : (
        <FoodGrid ingredients={ingredients} />
      )}
    </main>
  );
}

export default Main;
