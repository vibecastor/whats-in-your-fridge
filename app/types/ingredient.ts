interface Ingredient {
  id: number;
  name: string;
  category: string;
  container: string;
  quantity: number;
  description: string;
  bestUsedIn: string;
  flavors: string[];
  servingSize: number; // in grams
  calories: number; // in kcal
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
}

export default Ingredient;
