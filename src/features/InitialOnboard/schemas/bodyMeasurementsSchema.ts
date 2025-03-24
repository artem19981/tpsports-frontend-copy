import { isDefined } from 'shared/lib/is-defined';
import { InferType, string, number, object } from 'yup';

export const bodyMeasurementsSchema = object({
  height: number().required(),
  weight: number().required(),
  waist_circumference: string()
    .transform((value, original) => {
      if (original === '') {
        return null;
      }
      return value;
    })
    .nullable()
    .notRequired()
    .matches(/^\d+$/, 'Введите число') // Проверка, что ввод содержит только цифры
    .when((_, schema, { value }) => {
      if (isDefined(value)) {
        return schema
          .typeError('Введите число')
          .test('max', 'Максимум 150 см', (val) => Number(val) <= 150)
          .test('min', 'Минимум 40 см', (val) => Number(val) >= 40);
      }
      return schema;
    }),
});

export type BodyMeasurementsSchema = InferType<typeof bodyMeasurementsSchema>;
