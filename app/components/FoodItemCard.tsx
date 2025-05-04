import React from "react";

// Define the data structure for the props
export interface Ingredient {
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

interface FoodItemCardProps {
  ingredient: Ingredient;
}

function FoodItemCard(props: FoodItemCardProps) {
  const {
    name,
    category,
    container,
    quantity,
    description,
    bestUsedIn,
    flavors,
    servingSize,
    calories,
    protein,
    carbs,
    fat,
  } = props.ingredient;

  return (
    <article className="shadow-lg p-6 rounded-lg bg-card-bg border border-card-border hover:shadow-xl transition-all dark:hover:shadow-primary/10 space-y-4">
      <h3 className="font-bold text-3xl mb-2 text-foreground transition-colors">
        {name}
      </h3>

      {/* Description */}
      <div className="min-h-16 py-2 bg-orange-100 dark:bg-orange-950/30 flex flex-col rounded-md transition-colors">
        <p className="font-medium text-xl mx-1 text-foreground transition-colors">
          {description}
        </p>
      </div>

      <ul className="flex flex-col gap-1 text-foreground transition-colors">
        <li className="text-md">
          <b>Container:</b> {!container ? "none" : container}
        </li>
        <li className="text-md">
          <b>Quantity:</b> {quantity}
        </li>
        <li className="text-md">
          <b>Category:</b> {category}
        </li>
      </ul>

      {/* Best Used In */}
      <div className="border-t border-card-border pt-4 transition-colors">
        <h4 className="font-semibold text-lg mb-1 text-foreground transition-colors">
          Best Used In
        </h4>
        <p className="text-foreground/70 transition-colors">{bestUsedIn}</p>
      </div>

      {/* Flavors */}
      <div className="border-t border-card-border pt-4 transition-colors">
        <h5 className="font-semibold text-lg mb-1 text-foreground transition-colors">
          Flavors
        </h5>
        <ul className="flex flex-wrap gap-2">
          {flavors.map((flavor, index) => (
            <li
              key={index}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-600 px-4 py-2 rounded-full text-white text-md transition-colors"
            >
              {flavor}
            </li>
          ))}
        </ul>
      </div>

      {/* Nutritional Information */}
      <div className="border-t border-card-border pt-4 transition-colors">
        <h6 className="font-semibold text-lg text-foreground mb-2 transition-colors">
          Nutritional Information
        </h6>
        <ul className="text-md space-y-1 bg-orange-100 dark:bg-orange-950/30 rounded-md p-3 text-foreground transition-colors">
          <li>Serving Size: {servingSize}g</li>
          <li>Calories: {calories} kcal</li>
          <li>Protein: {protein} g</li>
          <li>Carbohydrates: {carbs} g</li>
          <li>Fat: {fat} g</li>
        </ul>
      </div>
    </article>
  );
}

export default FoodItemCard;
