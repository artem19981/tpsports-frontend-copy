import { Control } from 'react-hook-form';

import { ControlledInput } from 'shared/ui';

import { LoginFormSchema } from '../../model';

interface Props {
  control: Control<LoginFormSchema>;
}

export function LoginForm({ control }: Props) {
  return (
    <div>
      <p
        style={{
          fontSize: 30,
          marginBottom: 20,
        }}
      >
        Вход
      </p>
      <p className="messagesText">Заполните данные для входа</p>
      <div style={{ marginTop: 30 }}>
        <ControlledInput
          type="email"
          control={control}
          name="email"
          label="Электронная почта"
          autoComplete="email"
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <ControlledInput
          type="password"
          control={control}
          name="password"
          label="Пароль"
        />
      </div>
    </div>
  );
}
