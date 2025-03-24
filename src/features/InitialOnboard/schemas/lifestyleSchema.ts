import { array, boolean, InferType, number, object, string } from 'yup';

export const lifestyleSchema = object({
  sleep_schedule_wakeUp: string().required(),
  sleep_schedule_down: string().required(),
  sleep_quality: number().required(),
  smoking: boolean().required(),
  alcohol_consumption: number().required(),
});

export type LifestyleSchema = InferType<typeof lifestyleSchema>;
