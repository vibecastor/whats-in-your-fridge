import { useState } from "react";
import Ingredient from "../types/ingredient";

function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  return { ingredients, setIngredients };
}

export default useIngredients;
