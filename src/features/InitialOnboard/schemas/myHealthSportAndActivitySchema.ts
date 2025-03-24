import { InferType, number, object, string } from 'yup';
import { trainingInfoSchema } from './trainingInfoSchema';
import { strengthTrainingSchema } from './strengthTrainingSchema';

export const myHealthSportAndActivitySchema = trainingInfoSchema.concat(
  strengthTrainingSchema
);

export type MyHealthSportAndActivitySchema = InferType<
  typeof myHealthSportAndActivitySchema
>;
