import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledInput, MainPageModal, TimerButton } from 'shared/ui';
import styles from './UserSecurityAddEmail.module.scss';
import { GoBackIcon } from '../GoBackIcon/GoBackIcon';
import { useMediaQuery } from '@mui/material';
import { useLinkEmailAddress } from 'features/Auth/lib';
import { LinkEmailSchema, linkEmailSchema } from 'features/Auth/model/schemas/linkEmailSchema';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';

interface Props {
  onClose: () => void;
}

export const UserSecurityAddEmail = ({ onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 650px)');

  const { mutate, isPending } = useLinkEmailAddress(() => setIsOpen(true));

  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(linkEmailSchema),
  });

  const onSubmit = (form: LinkEmailSchema) => {
    mutate(form.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      {!isMobile && <GoBackIcon onClose={onClose} />}

      <div className={styles.content}>
        <ControlledInput
          label="Электронная почта"
          type="text"
          control={control}
          name="email"
          autoComplete="new-email"
        />
      </div>

      <MyHealthFormSubmitButton type="submit" disabled={isPending} visible={formState.isValid} />

      <MainPageModal open={isOpen} onClose={onClose} contentClassName={styles.modal}>
        <ActionResult
          title="Подтвердите свою электронную почту"
          status={ActionStatus.Success}
          subtitle="Для завершения проверьте и подтвердите свою электронную почту. Проверьте также папку «Спам», если письмо не пришло."
          action={
            <TimerButton
              text="Отправить повторно"
              intervalText="Отправить повторно через "
              onClick={() => {
                console.log('click');
              }}
            />
          }
        />
      </MainPageModal>
    </form>
  );
};
