import { boolean, InferType, number, object } from 'yup';

export const womenHealthSchema = object({
  menopause: boolean().required(),
  regular_periods: boolean().required(),
  painful_periods: number().required(),
  pregnancy: boolean().required(),
  planning_pregnancy: boolean().required(),
  breastfeeding: boolean().required(),
});

export type WomenHealthSchema = InferType<typeof womenHealthSchema>;
