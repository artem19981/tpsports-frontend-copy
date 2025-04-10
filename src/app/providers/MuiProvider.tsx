'use client';

import React, { FC, ReactNode } from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ru } from 'date-fns/locale/ru';

const darkTheme = createTheme({
  typography: {
    fontFamily: 'var(--NeueMachina), sans-serif',
  },
  palette: {
    mode: 'dark',
  },
});

interface Props {
  children: ReactNode;
}

export const MuiProvider: FC<Props> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppRouterCacheProvider options={{ key: 'css' }}>{children}</AppRouterCacheProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
