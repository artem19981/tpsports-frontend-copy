import { Path, UseFormSetValue } from 'react-hook-form';
import { BUTTONS_GROUP_SEPARATOR } from 'shared/ui';

export const useOnButtonClick = (setValue: UseFormSetValue<any>) => {
  return (value: string, selectedValues: string = '', fieldName: Path<any>) => {
    if (value === 'Нет инвентаря') {
      setValue(fieldName, value, { shouldDirty: true });
      return;
    }

    const valuesArray = selectedValues
      .split(BUTTONS_GROUP_SEPARATOR)
      .map((v) => v.trim());

    if (valuesArray[0] === 'Нет инвентаря') {
      setValue(fieldName, value, { shouldDirty: true });
      return;
    }

    if (valuesArray.includes(value)) {
      const newValues = valuesArray.filter((v) => v !== value);
      setValue(fieldName, newValues.join(BUTTONS_GROUP_SEPARATOR), {
        shouldDirty: true,
      });
    } else {
      setValue(
        fieldName,
        selectedValues
          ? `${selectedValues}${BUTTONS_GROUP_SEPARATOR}${value}`
          : value,
        { shouldDirty: true }
      );
    }
  };
};
