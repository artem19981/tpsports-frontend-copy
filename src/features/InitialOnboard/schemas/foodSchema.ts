import { InferType, number, object, string } from 'yup';

export const foodSchema = object({
  daily_water_intake: number().required(),
  food_intolerance: string(),
  food_allergies: string(),
  memory: number().required(),
  learning: number().required(),
});

export type FoodSchema = InferType<typeof foodSchema>;
