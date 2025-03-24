import { useEffect, useState } from 'react';

/**
 * 1) посмотреть что поле равно undefined
 * 2) посмотреть что оно хоть раз обновилось
 */

export function useChangedFields(dirtyFields: Record<string, any>) {
  const [changedFields, setChangedFields] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    setChangedFields((prev) => {
      const updatedFields = { ...prev };

      Object.entries(dirtyFields).forEach(([name]) => {
        if (!updatedFields[name]) {
          updatedFields[name] = true;
        }
      });

      return updatedFields;
    });
  }, [Object.keys(dirtyFields).length]);

  const hasAnyFieldChanged = Object.keys(changedFields).length > 0;

  return {
    changedFields,
    hasAnyFieldChanged,
    reset: () => setChangedFields({}),
  };
}
