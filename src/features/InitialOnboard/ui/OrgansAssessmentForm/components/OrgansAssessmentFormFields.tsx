import { Controller } from 'react-hook-form';
import { TextArea } from 'shared/ui';

import styles from '../OrgansAssessmentForm.module.scss';
import { inputs } from '../inputs';
import { Label } from 'shared/ui/Label';

interface Props {
  control: any;
}

export const OrgansAssessmentFormFields = ({ control }: Props) => {
  return (
    <>
      <Label className={styles.label}>
        Опишите, есть ли у вас проблемы с этими системами организма и какие
        симптомы вас беспокоят.
      </Label>

      {inputs.map((input) => (
        <Controller
          key={input.label}
          control={control}
          name={input.name as any}
          render={({ field }) => (
            <TextArea
              {...input}
              {...field}
              containerClassName={styles.inputContainer}
            />
          )}
        />
      ))}
    </>
  );
};
