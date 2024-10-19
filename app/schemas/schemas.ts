import { z } from 'zod';

export const ingredientSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  container: z.string(),
  quantity: z.number(),
  description: z.string(),
  bestUsedIn: z.string(),
  flavors: z.array(z.string()),
  servingSize: z.number(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
});

export const outputSchema = z.object({
  ingredients: z.array(ingredientSchema),
});