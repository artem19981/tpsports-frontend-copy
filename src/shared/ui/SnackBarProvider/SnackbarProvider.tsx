'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import styles from './Snackbar.module.scss';
import classNames from 'classnames';

type SnackbarType = 'success' | 'error' | 'info';

type SnackbarContextType = (message: string, type?: SnackbarType) => void;

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('success');

  const showSnackbar = (
    msg: string,
    snackbarType: SnackbarType = 'success'
  ) => {
    setMessage(msg);
    setType(snackbarType);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        className={classNames(styles.snackbar, styles[type])}
      >
        <div className={styles.alert}>{message}</div>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
