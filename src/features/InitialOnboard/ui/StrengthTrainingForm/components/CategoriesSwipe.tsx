import { ToggleButton } from 'shared/ui';
import styles from '../StrengthTrainingForm.module.scss';

export function CategoriesSwipe({ isActive, value, onClick, borderColor, height }: any) {
  return (
    <ToggleButton
      isActive={isActive}
      value={value}
      onClick={() => onClick(value)}
      className={styles.toggleButton}
      style={{
        borderColor: borderColor,
        height: height,
        width: height ? 'auto' : '',
        padding: height ? '27px' : '',
        maxWidth: height ? '100%' : '',
        fontSize: height ? '0px 27px' : '',
      }}
    />
  );
}
