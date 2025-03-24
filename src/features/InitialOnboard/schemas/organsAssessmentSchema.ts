import { InferType, object, string } from 'yup';

export const organsAssessmentSchema = object({
  musculoskeletal_system: string(),
  cardiovascular_system: string(),
  respiratory_system: string(),
  digestive_system: string(),
  urinary_system: string(),
  nervous_system: string(),
  immune_system: string(),
  endocrine_system: string(),
});

export type OrgansAssessmentSchema = InferType<typeof organsAssessmentSchema>;
