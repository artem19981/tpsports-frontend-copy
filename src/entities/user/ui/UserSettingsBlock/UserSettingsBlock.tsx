import React from 'react';
import Image from 'next/image';
import settingsSrc from './assets/settings.png';
import styles from './UserSettingsBlock.module.scss';

export const UserSettingsBlock = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={settingsSrc}
        alt="settings"
        width={48}
        height={48}
      />

      <h3 className={styles.title}>Настройки</h3>
    </div>
  );
};
