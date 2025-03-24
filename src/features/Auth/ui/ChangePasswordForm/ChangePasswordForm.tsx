import { Control } from 'react-hook-form';

import { ControlledInput } from 'shared/ui';

import { ChangePasswordSchema } from '../../model';

interface Props {
  control: Control<ChangePasswordSchema>;
}

export function ChangePasswordForm({ control }: Props) {
  return (
    <div>
      <p
        style={{
          fontSize: 21,
          marginBottom: 20,
        }}
      >
        Создать новый пароль
      </p>
      <div
        style={{
          marginTop: 30,
        }}
      >
        <ControlledInput
          label="Новый пароль"
          type="password"
          control={control}
          name="password"
          autoComplete="new-password"
        />
      </div>
      <div
        style={{
          marginTop: 30,
        }}
      >
        <ControlledInput
          label="Подтвердить новый пароль"
          type="password"
          control={control}
          name="confirmPassword"
          autoComplete="new-password"
        />
      </div>
    </div>
  );
}
