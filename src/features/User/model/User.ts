import { Gender } from 'entities/user/model';

export interface User {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  name1: string;
  name2: string;
  email: string;
  phone_number: string;
  birth_date: string;
  password: string;
  messages_limit: number;
  used_limit: number;
  access_token: string;
  isOnboardingCompleted: boolean;
}

export interface UserProfile {
  id: number;
  email: string;
  created_at?: string;
  updated_at?: string;
  first_name?: string | null;
  last_name?: string | null;
  birth_date?: string | null;
  gender?: Gender;
  phone_number?: string | null;
  height?: number | null;
  weight?: number | null;
  waist_circumference?: number | null;
  fitness_level?: string;
  steps?: string | null;
  favorite_training_types?: string | null;
  favorite_training_types_other?: string | null;
  fitness_goal?: string | null;
  fitness_goal_other?: string | null;
  training_location?: string | null;
  equipment?: string | null;
  injuries_or_restrictions?: string | null;
  sleep_schedule?: {
    bedtime: string;
    wake_time: string;
  };
  sleep_quality?: number;
  smoking?: boolean;
  alcohol_consumption?: string;
  daily_water_intake?: number;
  food_intolerance?: string | null;
  food_allergies?: string | null;
  memory?: number;
  learning?: number;
  menopause?: boolean | null;
  regular_periods?: boolean | null;
  painful_periods?: number | null;
  pregnancy?: boolean | null;
  planning_pregnancy?: boolean | null;
  breastfeeding?: boolean | null;
  musculoskeletal_system?: string | null;
  cardiovascular_system?: string | null;
  respiratory_system?: string | null;
  digestive_system?: string | null;
  urinary_system?: string | null;
  // new fields
  nervous_system?: string | null;
  immune_system?: string | null;
  endocrine_system?: string | null;

  // todo: прошел ли пользователь начальный онбординг
  is_completed: boolean;
}
