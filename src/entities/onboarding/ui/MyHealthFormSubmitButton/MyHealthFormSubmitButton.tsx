import React, { useEffect } from 'react';

import styles from './MyHealthFormSubmitButton.module.scss';
import { Button, ButtonProps } from 'shared/ui';
import classNames from 'classnames';

export const MyHealthFormSubmitButton = ({
  visible,
  label = 'сохранить',
  ...props
}: ButtonProps & { visible: boolean; label?: string }) => {
  const [_visible, setVisible] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setVisible(true);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }
  }, [visible]);
  console.log(_visible);

  if (!_visible) {
    return null;
  }

  return (
    <div
      className={classNames(styles.container, { [styles.invisible]: !visible })}
    >
      <Button type="submit" className={styles.button} {...props}>
        {label}
      </Button>
    </div>
  );
};
