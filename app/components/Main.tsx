import ImageUpload from "./ImageUpload";
import FoodGrid from "./FoodGrid";
import GridPlaceHolderImage from "./GridPlaceHolderImage";
import useIngredients from "../hooks/useIngredients";
import { useState } from "react";
import FoodSpinner from "./FoodSpinner";
import { RefreshCw } from "lucide-react";

function Main() {
  const { ingredients, setIngredients } = useIngredients();
  const [isLoading, setIsLoading] = useState(false);

  const handleTryAgain = () => {
    setIngredients([]);
  };

  return (
    <main className="flex flex-col justify-center gap-4 p-2 bg-background transition-colors">
      {ingredients.length === 0 ? (
        <ImageUpload
          setIngredients={setIngredients}
          setLoading={setIsLoading}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleTryAgain}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded transition duration-200 ease-in-out transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      )}

      {isLoading ? (
        <FoodSpinner size={256} />
      ) : ingredients.length === 0 ? (
        <GridPlaceHolderImage />
      ) : (
        <FoodGrid ingredients={ingredients} />
      )}
    </main>
  );
}

export default Main;
