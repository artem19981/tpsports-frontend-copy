import { RegistrationConfirmPage } from 'pageModules/RegistrationConfirmPage';

interface Props {
  params: {
    token: string[];
  };
}

export default function RegistrationConfirm(data: Props) {
  return <RegistrationConfirmPage token={data.params.token[0]} />;
}
