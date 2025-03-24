import React from 'react';
import styles from './MyHealthUserBlock.module.scss';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import avatarSrc from './assets/avatar.png';
import { UserProfile } from 'features/User/model';
import { capitalizeFirstLetter } from 'shared/lib/formatter/capitalizeFirstLetter';

interface Props
  extends Pick<UserProfile, 'first_name' | 'last_name' | 'email'> {}

export const MyHealthUserBlock = ({ first_name, last_name, email }: Props) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <div className={styles.container}>
      {isMobile && (
        <Image
          className={styles.avatar}
          src={avatarSrc}
          alt="avatar"
          width={59}
          height={59}
        />
      )}

      <h3 className={styles.title}>Мое Здоровье</h3>
      <h3 className={styles.subtitle}>
        {first_name ? capitalizeFirstLetter(first_name) : ''}{' '}
        {last_name ? capitalizeFirstLetter(last_name) : ''}
        {!first_name && !last_name && email}
      </h3>
    </div>
  );
};
