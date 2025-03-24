import { Control } from 'react-hook-form';

import { AuthHeaders } from 'entities/auth/AuthHeaders';
import { ControlledInput } from 'shared/ui';

import { LoginFormSchema } from '../../model';

interface Props {
  control: Control<LoginFormSchema>;
}

export function RegistrationForm({ control }: Props) {
  return (
    <div>
      <AuthHeaders
        title="Создать аккаунт"
        subtitle="Твоя персональная команда интеллектуальных ассистентов ждет тебя!"
      />
      <div style={{ marginTop: 30 }}>
        <ControlledInput
          label="Электронная почта"
          type="text"
          control={control}
          name="email"
          autoComplete="new-email"
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <ControlledInput
          label="Пароль"
          type="password"
          control={control}
          name="password"
          autoComplete="new-password"
        />
      </div>
    </div>
  );
}
