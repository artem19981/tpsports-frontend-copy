import { Input, InputProps } from 'shared/ui';

interface Props {
  inputProps: InputProps;
}

export function RecoverPasswordForm({ inputProps }: Props) {
  return (
    <div>
      <p
        style={{
          fontSize: 30,
          marginBottom: 20,
        }}
      >
        Сбросить пароль
      </p>
      <p className="messagesText">
        Введите свою электронную почту, и мы отправим инструкции по сбросу
        пароля
      </p>
      <div
        style={{
          marginTop: 30,
        }}
      >
        <Input {...inputProps} label="Электронная почта" />
      </div>
    </div>
  );
}
