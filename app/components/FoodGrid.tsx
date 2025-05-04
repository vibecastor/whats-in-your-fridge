import FoodItemCard from "./FoodItemCard";
import Ingredient from "../types/ingredient";

interface FoodGridProps {
  ingredients: Ingredient[];
}

function FoodGrid({ ingredients }: FoodGridProps) {
  return (
    <div
      className="grid gap-6 
      grid-cols-1 
      sm:grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4
      p-2 transition-colors"
    >
      {ingredients.map((ingredient) => (
        <FoodItemCard key={ingredient.id} ingredient={ingredient} />
      ))}
    </div>
  );
}

export default FoodGrid;
