import { InferType, number, object, string } from 'yup';

export const sportAndActivitySchema = object({
  fitness_level: string().required(),
  steps: number().required(),
});

export type SportAndActivitySchema = InferType<typeof sportAndActivitySchema>;
