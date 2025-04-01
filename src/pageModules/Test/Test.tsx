'use client';

import React from 'react';
import { Box } from '@mui/material';
import imageSrc from './assets/ellipse.png';
import Image from 'next/image';
import styles from './styles.module.scss';

export const Test: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '90vw',
        height: '90vh',
        backgroundColor: '#111',
        margin: 'auto',
        marginTop: '5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
        gap: 20,
      }}
    >
      <Image src={imageSrc} alt="www" width={150} height={150} />
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(
            50% 50% at 50% 50%, 
            #d9d9d9 0%, 
            #d9d9d9 30%,
            #30303000 80%, 
            #30303000 90%, 
            #30303000 100% 
          )`,
          opacity: 0.4,
        }}
      ></div>
      <div className={styles.element}></div>
    </Box>
  );
};
