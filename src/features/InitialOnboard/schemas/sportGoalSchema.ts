import { InferType, object, string } from 'yup';

export const sportGoalSchema = object({
  fitness_goal: string(),
  fitness_goal_other: string(),
});

export type SportGoalSchema = InferType<typeof sportGoalSchema>;
