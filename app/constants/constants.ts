export const prompt =`You will be provided with an image of food items.
Your goal is to identify all food items in the image and return them in the provided schema.
Name each food item (do not describe the containers and ignore non-food items).
Estimate the quantity of each item and give a short description of how to use each item in recipes and nutritional information about each item.
Here is further instruction for each ingredient. 
id: unique number identifier,
name: name of the food item such as carrots, steak, milk,
category: a string such as fruits, vegetables, meats, dairy, etc,
container: describe the packaging or storage type, with the quantity field focusing purely on the count. If no container, output an empty string,  
quantity: estimated quantity as a number,
description: a one sentence description of the food item ,
bestUsedIn: recommendation of what kind of recipe to use the item in,
flavors: an array of strings describing the flavor characteristics of the food item such as ['sweet', 'savory', 'tart'],
calories: a number in kcal,
protein: a number in grams,
carbs: a number in grams,
fat: a number in grams`

