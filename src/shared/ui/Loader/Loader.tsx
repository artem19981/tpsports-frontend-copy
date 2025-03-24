import { CircularProgress } from '@mui/material';
import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  return <CircularProgress size="54px" className={styles.loader} />;
};
