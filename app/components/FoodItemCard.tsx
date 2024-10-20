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
    <article className="shadow-lg p-6 rounded-lg bg-white hover:shadow-xl transition-shadow space-y-4">
      <h3 className="font-bold text-3xl mb-2 text-gray-800">{name}</h3>

      {/* Description */}
      <div className="min-h-16 py-2 bg-orange-100 flex flex-col rounded-md">
        <p className="font-medium text-xl mx-1">{description}</p>
      </div>

      <ul className="flex flex-col gap-1">
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
      <div className="border-t pt-4">
        <h4 className="font-semibold text-lg mb-1">Best Used In</h4>
        <p className="text-gray-600">{bestUsedIn}</p>
      </div>

      {/* Flavors */}
      <div className="border-t pt-4">
        <h5 className="font-semibold text-lg mb-1">Flavors</h5>
        <ul className="flex space-x-2">
          {flavors.map((flavor, index) => (
            <li
              key={index}
              className="bg-orange-500 hover:bg-orange-300 px-4 py-2 rounded-full text-md"
            >
              {flavor}
            </li>
          ))}
        </ul>
      </div>

      {/* Nutritional Information */}
      <div className="border-t pt-4">
        <h6 className="font-semibold text-lg text-gray-800 mb-2">
          Nutritional Information
        </h6>
        <ul className="text-md space-x-2 bg-orange-100 rounded-md p-2">
          <li className="mx-2">Serving Size: {servingSize}g</li>
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
