import { InferType, object, string } from 'yup';

export const trainingInfoSchema = object({
  training_location: string(),
  equipment: string(),
  injuries_or_restrictions: string(),
});

export type TrainingInfoSchema = InferType<typeof trainingInfoSchema>;
