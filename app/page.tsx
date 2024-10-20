"use client";

import ImageUpload from "./components/ImageUpload";
import FoodGrid from "./components/FoodGrid";
import GridPlaceHolderImage from "./components/GridPlaceHolderImage";
import useIngredients from "./hooks/useIngredients";

function App() {
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

export default App;
