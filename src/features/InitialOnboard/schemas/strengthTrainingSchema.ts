import { InferType, object, string } from 'yup';

export const strengthTrainingSchema = object({
  favorite_training_types: string(),
  favorite_training_types_other: string(),
});

export type StrengthTrainingSchema = InferType<typeof strengthTrainingSchema>;
