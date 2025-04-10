import { Control } from 'react-hook-form';

import { ControlledInput } from 'shared/ui';

import { LoginFormSchema } from '../../model';
import styles from './LoginForm.module.scss';

interface Props {
  control: Control<LoginFormSchema>;
}

export function LoginForm({ control }: Props) {
  return (
    <div>
      <p className={styles.title}>Вход</p>

      <p className={styles.subtitle}>Заполните данные для входа</p>

      <ControlledInput
        type="email"
        control={control}
        name="email"
        label="Электронная почта"
        autoComplete="email"
        inputWrapperClassName={styles.inputWrapper}
      />

      <ControlledInput
        type="password"
        control={control}
        name="password"
        label="Пароль"
        inputWrapperClassName={styles.inputWrapper}
      />
    </div>
  );
}
